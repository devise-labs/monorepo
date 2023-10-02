import * as cli from '@devise-labs/lib-common-cli';
import * as fs from 'fs';
import * as path from 'path';
import * as proc from 'child_process';

export function registerCommand(cmd: cli.cmd.Command) {
  cmd
    .argument("<app name>", "name of app")
    .action((appName: string) => {
      const appPath = path.resolve(cli.DIR.App, 'web', appName);
      const packageJsonPath = path.resolve(appPath, 'package.json');
      if (!fs.existsSync(packageJsonPath)) {
        throw new cli.UserError(`No such app ${appName}`);
      }
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath).toString());
      proc.execSync(`PORT=${packageJson.appConfig.port} pnpm --filter ${cli.common.consts.NPM_ORG}/app-web-${appName} exec next dev --turbo`, {stdio: 'inherit'});
    });
}

export const description = 'yo';
