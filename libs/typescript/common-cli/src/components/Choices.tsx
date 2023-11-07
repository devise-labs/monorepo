import * as React from 'react';
import { Box, Text } from 'ink';
import { Menu } from './Menu.tsx';

export type ChoicesProps<ChoiceMap> = {
  possibleChoices: ChoiceMap;
  choices: {[k in keyof ChoiceMap]?: string;};
  onChoices: (choices: {[k in keyof ChoiceMap]: string;}) => void;
};

export function Choices<ChoiceMap extends Record<string, string[]>>({possibleChoices, choices, onChoices}: ChoicesProps<ChoiceMap>) {
  const preChosen = Object.entries(choices).filter(([k, v]) => v !== undefined) as [keyof ChoiceMap, string][];
  const [chosen, setChosen] = React.useState<[keyof ChoiceMap, string][]>([]);
  function choose(k: keyof ChoiceMap, v: string) {
    const newChosen: [keyof ChoiceMap, string][] = [...chosen, [k, v]];
    setChosen(newChosen);
    if (newChosen.length + Object.keys(preChosen).length === Object.keys(possibleChoices).length) {
      onChoices(Object.fromEntries(newChosen) as {[k in keyof ChoiceMap]: string;});
    }
  }
  const chosenSet = new Set([...Object.keys(preChosen), ...chosen.map(([k, v]) => k)]);
  const unchosen = Object.keys(possibleChoices).filter(k => !chosenSet.has(k));
  const focus = unchosen[0];
  const focusChoices = possibleChoices[focus];
  return <>
    {preChosen.map(([k, v]) => <Box key={k as string}><Text>{k as string}: {v}</Text></Box>)}
    {chosen.map(([k, v]) => <Box key={k as string}><Text>{k as string}: {v}</Text></Box>)}
    {unchosen.length > 0 && <>
      <Box><Text>{focus}: </Text></Box>
      <Menu key={focus} elements={focusChoices} onSubmit={i => { choose(focus, focusChoices[i]); }} />
    </>}
  </>
}
