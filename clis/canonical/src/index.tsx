import { cmd, common, UserError, ink, React } from '@devise-labs/lib-common-cli';

function Menu() {
  const { Box, Text, Newline, useInput } = ink;
  const [curElement, setElement] = React.useState(0);
  const [curNum, setNum] = React.useState(0);
  const elements = ["hello", 'world'];
  useInput((input, key) => {
    if (key.upArrow) {
      setElement(Math.abs((curElement - 1) % elements.length));
    } else if (key.downArrow) {
      setElement((curElement + 1) % elements.length);
    }
  });
  function getColor(i: number): ink.TextProps['color'] {
    return i === curElement ? 'green' : 'cyan';
  }
  return <React.Fragment>
    {elements.map((el, i) => <Box key={el}>
      <Text color={getColor(i)}>{i === curElement ? '●' : '○'}</Text>
      <Text color={getColor(i)}>{el}</Text>
    </Box>)}
  </React.Fragment>
}

export function registerCommand(cmd: cmd.Command) {
  cmd
    .argument('[example arg]', 'exmaple of an argument')
    .action(async (exampleArg?: string) => {
      ink.render(<Menu />);
    });
}

export const description = "canonical no-op cli used to create clis template";
