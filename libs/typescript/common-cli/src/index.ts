import * as path from 'path';
import { consts } from '../../common-base/src';

export * as cmd from 'commander';
export * as fs from 'fs';
export * as path from 'path';
export * as common from '../../common-base/src';

export const MONOREPO_ROOT_DIR = path.resolve(__dirname, '../../../../');
function getDir(pt: consts.PackageType) { return path.resolve(MONOREPO_ROOT_DIR, consts.PACKAGE_ABBRV[pt] + 's'); }
export const DIR: {[pt in consts.PackageType]: string} = 
  Object.fromEntries(Object.values(consts.PackageType).map(pt => [pt, getDir(pt)])) as {[pt in consts.PackageType]: string};

export class UserError extends Error {}