/* eslint-disable @typescript-eslint/no-unused-vars, import/no-duplicates */

// Test @typescript-eslint/consistent-type-imports
// Types should be imported via separate `import type` statements

// expect: @typescript-eslint/consistent-type-imports
import { SomeType } from './type-definitions';

// expect: @typescript-eslint/consistent-type-imports
import { AnotherType, someValue } from './type-definitions';

// Use the types to make them detectable as type-only usage
const x: SomeType = { name: 'test' };
const y: AnotherType = { id: 1 };
console.log(someValue);

// Test @typescript-eslint/array-type
// Should use string[] instead of Array<string> for simple types

// expect: @typescript-eslint/array-type
type StringArray = Array<string>;

// expect: @typescript-eslint/array-type
type NumberArray = Array<number>;

// expect: @typescript-eslint/array-type
const items: Array<boolean> = [];

// Test @typescript-eslint/consistent-indexed-object-style
// Should use Record<string, T> instead of { [key: string]: T }

// expect: @typescript-eslint/consistent-indexed-object-style
type StringMap = { [key: string]: string };

// expect: @typescript-eslint/consistent-indexed-object-style
type NumberMap = { [k: string]: number };
