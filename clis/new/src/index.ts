import { cmd, common, UserError } from '../../../libs/typescript/common-cli/src';

const validTypesDisplay = common.consts.VALID_INPUT_PACKAGE_TYPES.map(pt => `'${pt}'`).join(", ");

export const CANONICAL_PACKAGE_NAME = 'canonical';

export function registerCommand(cmd: cmd.Command) {
  cmd
    .command('lib', '')
}

export const description = Object.keys(common.consts.PACKAGE_HIERARCHY).map(k => common.consts.PACKAGE_ABBRV[k]).join("|");
