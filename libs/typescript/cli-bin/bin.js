import {execSync} from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const dir = path.resolve(fileURLToPath(import.meta.url), '../');
const entryPath = path.resolve(dir, 'entry.ts');
const args = process.argv.slice(2).join(' ');

const useBun = false;
if (useBun) {
  execSync(`BUN=${useBun} bun ${entryPath} ${args}`, {stdio: 'inherit'});
} else {
  const tsNodePath = path.resolve(dir, 'node_modules/.bin/ts-node-esm');
  const compilerOptions = {
    resolveJsonModule: true,
    module: "ESNext",
    moduleResolution: "NodeNext", 
    esModuleInterop: true,
    allowImportingTsExtensions: true,
    jsx: "react"
  }
  execSync(`NODE_NO_WARNINGS=1 pnpm exec ${tsNodePath} --compilerOptions ${JSON.stringify(JSON.stringify(compilerOptions))} ${entryPath} ${args}`, {stdio: 'inherit'});
}
