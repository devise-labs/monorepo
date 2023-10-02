import packageJson from './package.json';
import {fs, path, UserError, cmd, DIR, common} from '@devise-labs/lib-common-cli';

const program = new cmd.Command();
program
  .name("x")
  .description(packageJson.description)
  .action(() => {
    program.help();
  });

function handleError(error) {
  const errorType = error.constructor.name;
  const stack = error.stack;
  error.stack = 'see below...';
  if (errorType !== 'UserError') {
    common.logger.error({err: error}, 'non user error');
  } else {
    common.logger.error({err: error}, 'user error');
  }
  setTimeout(() => {
    console.log(stack);
    process.exit(1);
  });
}

async function main() {
  for (const cli of fs.readdirSync(DIR.CommandLineInterface)) {
    const cliPath = path.resolve(DIR.CommandLineInterface, cli);
    const cliPackageJsonPath = path.resolve(cliPath, 'package.json');
    const cliPackageJson = JSON.parse(fs.readFileSync(cliPackageJsonPath).toString());
    if (typeof cliPackageJson.name !== 'string') {
      throw new UserError(`Name missing for cli ${cli}`);
    }
    const parts = cliPackageJson.name.split('/');
    const name = parts[parts.length - 1].substring('cli-'.length);
    if (name !== cli) {
      throw new UserError(`CLI dir of ${cli} not matching name of ${name}`);
    }
    const {registerCommand, description} = process.env.BUN ? await import(cliPackageJson.name) : require(cliPackageJson.name);
    const command = program.command(name).description(description);
    if (typeof registerCommand !== 'function') {
      throw new UserError(`CLI '${cli}' not returning a 'registerCommand' function`);
    }
    if (typeof description !== 'string') {
      throw new UserError(`CLI '${cli}' not returning a 'description' string`)
    }
    registerCommand(command);
    command.showHelpAfterError();
  }
  program.parse();
}

try {
  main().catch(handleError);
} catch(e) {
  handleError(e);
}

process.on('unhandledRejection', (e) => {
  console.log('unhandled rejection');
  handleError(e);
});
