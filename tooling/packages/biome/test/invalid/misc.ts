/* eslint-disable @typescript-eslint/no-unused-vars, no-unused-vars */

export type MyType = {
  // expect: @stylistic/member-delimiter-style
  prop: string;
};

// expect: @typescript-eslint/no-explicit-any
const age: any = 'seventeen';

// expect: @typescript-eslint/no-explicit-any
type Anything = any;
