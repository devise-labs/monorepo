import { cmd, common, UserError } from '@definelabs/lib-deps-cli';

const validTypesDisplay = common.consts.VALID_INPUT_PACKAGE_TYPES.map(pt => `'${pt}'`).join(", ");

export function registerCommand(cmd: cmd.Command) {
  cmd
    .command('lib', '')
}

export const description = Object.keys(common.consts.PACKAGE_HIERARCHY).map(k => common.consts.PACKAGE_ABBRV[k]).join("|");
