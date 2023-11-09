import * as React from 'react';
import { Box, Text, useInput } from 'ink';
import { Menu } from './Menu.tsx';

export type ChoiceMeta<T> = 
  { input?: string; enum: true; options: T[]; } |
  { input?: string; enum: false; validate(input: string): {valid: true; value: T} | {valid: false}; description: string };

export type ChoicesProps<T extends {[k: string]: any}> = {
  choices: {[k in keyof T]: ChoiceMeta<T[k]>};
  onChoices: (choices: T) => void;
};

export function Choices<T extends {[k: string]: any}>({choices, onChoices}: ChoicesProps<T>) {
  const preChosen: [keyof T, string][] = [];
  const choiceKeys: (keyof T)[] = [];
  for (const k in choices) {
    choiceKeys.push(k);
    const v = choices[k];
    if (v.input) preChosen.push([k, v.input]);
  }

  const [chosen, setChosen] = React.useState<Partial<T>>({});
  const chosenKeys: (keyof T)[] = [];
  for (const k in chosen) { chosenKeys.push(k); }
  function choose(k: keyof T, v: any) {
    const newChosen: Partial<T> = {...chosen, [k]: v};
    setChosen(newChosen);
    if (Object.keys(newChosen).length + preChosen.length === Object.keys(choices).length) {
      onChoices(newChosen as T);
    }
  }

  const chosenSet = new Set([...preChosen.map(([k]) => k), ...chosenKeys]);
  const unchosen = choiceKeys.filter(k => !chosenSet.has(k));

  const focus = unchosen[0];
  const focusMeta = choices[focus];

  const [curText, setCurText] = React.useState("");
  useInput((input, key) => {
    if (focusMeta.enum) return;
    if (key.return) {
      const validation = focusMeta.validate(curText);
      if (validation.valid) {
        choose(focus, validation.value);
      }
      return;
    }
    const newText = curText + input;
    if (input.length) {
      setCurText(newText);
    }
    if (curText && (key.backspace || key.delete)) {
      setCurText(curText.substring(0, curText.length - 1));
    }
  });
  
  return <>
    {preChosen.map(([k, v]) => <Box key={k as string}><Text>{k as string}: {v}</Text></Box>)}
    {Object.entries(chosen).map(([k, v]) => <Box key={k as string}><Text>{k as string}: {v}</Text></Box>)}
    {unchosen.length > 0 && <>
      {focusMeta.enum && <>
        <Box><Text>{focus as string}: </Text></Box>
        <Menu key={focus as string} elements={focusMeta.options.map(opt => opt.toString())} onSubmit={i => { choose(focus, focusMeta.options[i]); }} />
      </>}
      {!focusMeta.enum && (() => {
        const isValid = focusMeta.validate(curText).valid;
        return <Box>
          <Text>{focus as string} ({focusMeta.description}): </Text>
          {curText && <Text>{curText + " "}</Text>}
          <Text color={'whiteBright'} backgroundColor={isValid ? 'green' : 'redBright'}>{` ${isValid ? '✓' : '✗'} `}</Text>
        </Box>
      })()}
    </>}
  </>
}
