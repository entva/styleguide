/* eslint-disable @typescript-eslint/no-unused-vars */

// Test @typescript-eslint/consistent-type-imports
// Types imported via separate `import type` statements (correct)
import type { SomeType } from './type-definitions';

// Test @typescript-eslint/array-type
// Using string[] syntax for simple types (correct)
type StringArray = string[];
type NumberArray = number[];
const items: boolean[] = [];

// Complex types can use Array<T> syntax
type ComplexArray = Array<{ id: string, name: string }>;

// Test @typescript-eslint/consistent-indexed-object-style
// Using Record<K, V> syntax (correct)
type StringMap = Record<string, string>;
type NumberMap = Record<string, number>;

// Test @typescript-eslint/consistent-type-definitions
// Using type instead of interface (correct)
type GoodType = {
  prop: string,
};

type AnotherGoodType = {
  id: number,
  name: string,
};
