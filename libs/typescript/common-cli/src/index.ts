import { consts } from '@devise-labs/lib-common-base';
import * as pth from 'path';
import { fileURLToPath } from 'url';
import React from 'react';
import { render as renderInk } from 'ink';

export * as cmd from 'commander';
export * as fs from 'fs';
export const path = pth;
export * as common from '@devise-labs/lib-common-base';
export * as ink from 'ink';
export { React };
export * from './components/index.ts';
export * from './resolve-inputs.tsx';

const dir = path.resolve(fileURLToPath(import.meta.url), '../');
export const MONOREPO_ROOT_DIR = path.resolve(dir, '../../../../');
function getDir(pt: consts.PackageType) { return path.resolve(MONOREPO_ROOT_DIR, consts.PACKAGE_ABBRV[pt] + 's'); }
export const DIR: {[pt in consts.PackageType]: string} = 
  Object.fromEntries(Object.values(consts.PackageType).map(pt => [pt, getDir(pt)])) as {[pt in consts.PackageType]: string};

export class UserError extends Error {}
