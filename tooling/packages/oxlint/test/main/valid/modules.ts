/* eslint-disable no-unused-vars */

import 'eslint';
import oxlint from 'oxlint';

import type { MyType } from './type-source';

console.warn('Used dep', oxlint);

const typed: MyType = { value: 'test' };

export const notDefault = 1;
