import * as React from 'react';
import { Box, Text, TextProps, useInput } from 'ink';

export type MenuProps = {
  elements: string[];
  curIndex?: number;
  onChange?: (index: number) => void;
  onSubmit?: (index: number) => void;
}

export function Menu({ elements, curIndex, onChange, onSubmit }: MenuProps) {
  const [curInternalIndex, setInternalIndex] = React.useState(curIndex ?? 0);
  const [choice, setChoice] = React.useState<undefined | string>(undefined);
  const  finalIndex = curIndex ?? curInternalIndex;
  useInput((input, key) => {
    if (choice) return;
    if (key.upArrow) {
      const nextIndex = Math.abs((finalIndex - 1) % elements.length);
      setInternalIndex(nextIndex);
      onChange?.(nextIndex);
    } else if (key.downArrow) {
      const nextIndex = (finalIndex + 1) % elements.length;
      setInternalIndex(nextIndex);
      onChange?.(nextIndex);
    } else if (key.return) {
      onSubmit?.(finalIndex);
      setChoice(elements[finalIndex]);
    }
  });
  if (choice) {
    return <Text color={'magenta'}>{choice}</Text>;
  }
  function getColor(i: number): TextProps['color'] {
    return i === finalIndex ? 'green' : 'cyan';
  }
  return <React.Fragment>
    {elements.map((el, i) => <Box key={el}>
      <Text color={getColor(i)}>{i === finalIndex ? '● ' : '○ '}</Text>
      <Text color={getColor(i)}>{el}</Text>
    </Box>)}
  </React.Fragment>
}
