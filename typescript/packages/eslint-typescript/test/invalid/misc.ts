/* eslint-disable @typescript-eslint/no-unused-vars */

export type MyType = {
  // expect: @typescript-eslint/member-delimiter-style
  prop: string;
};

// expect: @typescript-eslint/no-explicit-any
const age: any = 'seventeen';

// expect: @typescript-eslint/no-explicit-any
type Anything = any;
