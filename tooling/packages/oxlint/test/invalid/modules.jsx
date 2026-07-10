/* eslint-disable no-unused-vars */

// expect: import/no-extraneous-dependencies
import 'chalk';

// expect: import/no-duplicates
import module from './local-module';
// expect: import/no-duplicates
import sameThing from './local-module';
// expect: import/named
import { some } from './local-module';

// expect: import/no-unresolved
import './unexisted_module';

const variable = 2;

// expect: import/no-mutable-exports
let mutable = 1;
mutable = 2;
export { mutable };
