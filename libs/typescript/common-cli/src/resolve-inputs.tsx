import * as ink from 'ink';
import * as React from 'react';
import { Choices, ChoiceMeta } from './components/index.ts';

export async function resolveInputs<T extends {[k: string]: any}>(inputs: {[k in keyof T]: ChoiceMeta<T[k]>}): Promise<T> {
  return new Promise<T>(resolve => {
    ink.render(<Choices choices={inputs} onChoices={resolve} />);
  });
}