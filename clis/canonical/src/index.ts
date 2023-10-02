import { cmd, common, UserError } from '../../../libs/typescript/common-cli/src';

export function registerCommand(cmd: cmd.Command) {
  cmd
    .action(() => {
      common.logger.info({}, 'hello world');
    })
}

export const description = "description";
