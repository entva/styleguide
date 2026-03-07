/* eslint-disable @typescript-eslint/no-unused-vars */

import 'eslint';
import globals from 'globals';

import type { MyType } from './type-source';

console.warn('Used dep', globals);

const typed: MyType = { value: 'test' };

export const notDefault = 1;
