import { cmd, common, UserError } from '@definelabs/lib-deps-cli';

const validTypesDisplay = common.consts.VALID_INPUT_PACKAGE_TYPES.map(pt => `'${pt}'`).join(", ");

export function registerCommand(cmd: cmd.Command) {
  function deepRegister(outerCmd: cmd.Command, subtree: Record<string, true | string | object>) {
    for (const subCmdName in subtree) {
      const subNode = subtree[subCmdName];
      const name = (
        common.consts.PACKAGE_ABBRV[subCmdName as common.consts.PackageType] ??
        (
          typeof subNode === 'string' ? subNode as string : 
          subCmdName
        )
      );
      const desc = ;
      const subCmd = outerCmd.command(name).description(desc);
      if (typeof subNode === 'object') {
        deepRegister(subCmd, subNode as any);
      }
    }
  }
  deepRegister(cmd, common.consts.PACKAGE_HIERARCHY);
  cmd.action(() => { cmd.help(); })
  /*
  cmd
    .argument('<package type>', `one of ${validTypesDisplay}`)
    .action((packageType: string) => {
      if (!common.consts.VALID_INPUT_PACKAGE_TYPES.includes(packageType)) {
        throw new UserError(`'${packageType}' is not one of ${validTypesDisplay}`)
      }
      console.log(`Creating ${packageType}`);
    });
    */
}

export const description = Object.keys(common.consts.PACKAGE_HIERARCHY).map(k => common.consts.PACKAGE_ABBRV[k]).join("|");
