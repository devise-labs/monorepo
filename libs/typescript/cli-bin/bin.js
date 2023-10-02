const useBun = false;
if (useBun) {
  const path = require('path');
  const entryPath = path.resolve(__dirname, './entry.ts');
  const args = process.argv.slice(2).join(' ');
  require('child_process').execSync(`BUN=${useBun} bun ${entryPath} ${args}`, {stdio: 'inherit'});
} else {
  const {register} = require('ts-node');
  register({swc: true, compilerOptions: {module: 'node16', esModuleInterop: true, moduleResolution: "node16", jsx: 'react'}});
  require('./entry');
}
