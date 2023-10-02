import { cmd, common, UserError, ink, React } from '@devise-labs/lib-common-cli';

export function registerCommand(cmd: cmd.Command) {
  cmd
    .argument('[example arg]', 'exmaple of an argument')
    .action(async (exampleArg?: string) => {
      const { Text, render } = await ink;
      common.logger.info({exampleArg}, 'hello world');
      console.log(exampleArg);
      render(<Text color={'blue'}>hey</Text>);
    });
}

export const description = "canonical no-op cli used to create clis template";
