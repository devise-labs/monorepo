const {register} = require('ts-node');
register({swc: true, compilerOptions: {module: 'CommonJS'}});
const packageJson = require('./package.json');
const {CLIS_DIR, fs, path, UserError, cmd} = require('@definelabs/lib-deps-cli');

const program = new cmd.Command();
program
  .name("x")
  .description(packageJson.description);

function handleError(error) {
  const errorType = error.constructor.name;
  if (errorType !== 'UserError') {
    console.log(error.stack);
  } else {
    console.log(`${errorType}:`, error.message);
  }
  process.exit(1);
}

async function main() {
  for (const cli of fs.readdirSync(CLIS_DIR)) {
    const cliPath = path.resolve(CLIS_DIR, cli);
    const cliPackageJsonPath = path.resolve(cliPath, 'package.json');
    const cliPackageJson = JSON.parse(fs.readFileSync(cliPackageJsonPath).toString());
    const description = cliPackageJson.description;
    if (typeof cliPackageJson.name !== 'string' || typeof description !== 'string') {
      throw new UserError(`Name or description missing for cli ${cli}`);
    }
    const parts = cliPackageJson.name.split('/');
    const name = parts[parts.length - 1].substring('cli-'.length);
    if (name !== cli) {
      throw new UserError(`CLI dir of ${cli} not matching name of ${name}`);
    }
    const command = program.command(name).description(description);
    const {default: fn} = require(cliPackageJson.name);
    if (typeof fn !== 'function') {
      throw new UserError(`CLI ${cli} not returning a function`);
    }
    fn(command);
  }
  program.parse();
}

try {
  main().catch(handleError);
} catch(e) {
  handleError(e);
}
