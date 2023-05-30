import { cmd, common, UserError } from '@definelabs/lib-deps-cli';

const validTypesDisplay = common.consts.VALID_INPUT_PACKAGE_TYPES.map(pt => `'${pt}'`).join(", ");

export default function command(cmd: cmd.Command) {
  cmd
    .argument('<package type>', `one of ${validTypesDisplay}`)
    .action((packageType: string) => {
      if (!common.consts.VALID_INPUT_PACKAGE_TYPES.includes(packageType)) {
        throw new UserError(`'${packageType}' is not one of ${validTypesDisplay}`)
      }
      console.log(`Creating ${packageType}`);
    });
}