import { cmd, Choices, React, ink, resolveInputs } from '@devise-labs/lib-common-cli';

export function registerCommand(cmd: cmd.Command) {
  cmd
    .argument('[example arg]', 'exmaple of an argument')
    .action(async (exampleArg?: string) => {
      const hi = await resolveInputs({
        exampleArg: {
          enum: true,
          options: ['one', 'two']
        },
        another: {
          enum: false,
          validate(input) {
            const valid = /^([1-9]|(10))$/.test(input);
            if (valid) return {valid: true, value: parseInt(input)};
            return {valid: false};
          },
          description: 'num between 1 and 10'
        }
      });
      console.log('now done');
      console.log(hi);
    });
}

export const description = "canonical no-op cli used to create clis template";
