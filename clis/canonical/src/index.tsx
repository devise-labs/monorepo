import { cmd, Choices, React, ink } from '@devise-labs/lib-common-cli';

type CommandInputs = {
  exampleArg: string;
}

export function registerCommand(cmd: cmd.Command) {
  cmd
    .argument('[example arg]', 'exmaple of an argument')
    .action(async (exampleArg?: string) => {
      function App() {
        const [selection, setSelection] = React.useState<CommandInputs | undefined>(undefined);
        return <>
          <Choices possibleChoices={{exampleArg: ['test', 'another'], go: ['1', '2']}} choices={{exampleArg}} onChoices={setSelection} />
          {selection && <ink.Text>{JSON.stringify(selection)}</ink.Text>}
        </>
      }
      ink.render(<App />);
    });
}

export const description = "canonical no-op cli used to create clis template";
