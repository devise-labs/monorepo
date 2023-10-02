import { consts } from '@devise-labs/lib-common-base';
import * as pth from 'path';
import * as rct from 'react';

export * as cmd from 'commander';
export * as fs from 'fs';
export const path = pth;
export * as common from '@devise-labs/lib-common-base';
export {default as React} from 'react';
export const react = rct;
export const ink = import('ink');

export const MONOREPO_ROOT_DIR = path.resolve(__dirname, '../../../../');
function getDir(pt: consts.PackageType) { return path.resolve(MONOREPO_ROOT_DIR, consts.PACKAGE_ABBRV[pt] + 's'); }
export const DIR: {[pt in consts.PackageType]: string} = 
  Object.fromEntries(Object.values(consts.PackageType).map(pt => [pt, getDir(pt)])) as {[pt in consts.PackageType]: string};

export class UserError extends Error {}
