import * as path from 'path';

export * as cmd from 'commander';
export * as fs from 'fs';
export * as path from 'path';
export * as common from '@definelabs/lib-deps-common';

export const MONOREPO_ROOT_DIR = path.resolve(__dirname, '../../../../');
export const CLIS_DIR = path.resolve(MONOREPO_ROOT_DIR, 'clis');

export class UserError extends Error {}