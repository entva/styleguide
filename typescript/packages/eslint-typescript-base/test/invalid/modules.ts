/* eslint-disable @typescript-eslint/no-unused-vars */

// expect: @typescript-eslint/consistent-type-imports
import { MyType } from './type-source';

// expect: import/no-extraneous-dependencies
import 'chalk';

// expect: import/no-duplicates
import module from '../../index';
// expect: import/no-duplicates
import sameThing from '../../index';
// expect: import/named, import/no-duplicates
import { some } from '../../index';

// expect: import/no-unresolved
import './unexisted_module';

const variable = 2;

const typed: MyType = { value: 'test' };

// expect: import/no-mutable-exports
let mutable = 1;
mutable = 2;
export { mutable };
