/* eslint-disable @typescript-eslint/no-unused-vars */

import type { MyType } from './type-source';

import 'eslint';
import globals from 'globals';

console.warn('Used dep', globals);

const typed: MyType = { value: 'test' };

export const notDefault = 1;
