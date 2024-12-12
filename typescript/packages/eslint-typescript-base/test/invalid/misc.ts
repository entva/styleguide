/* eslint-disable @typescript-eslint/no-unused-vars */

export type MyType = {
  // expect: @stylistic/ts/member-delimiter-style
  prop: string;
};

// expect: @typescript-eslint/no-explicit-any
const age: any = 'seventeen';

// expect: @typescript-eslint/no-explicit-any
type Anything = any;

// expect: prefer-promise-reject-errors
Promise.reject('Reject with string');

// expect: eqeqeq
const condition = 1 == true;

switch (1) {
  case true:
    // expect: no-case-declarations
    const insideSwitch = 1;
    break;
}

// expect: no-nested-ternary
const nestedTernary = condition > true
  // expect: operator-linebreak
  ? null
  // expect: operator-linebreak
  : condition > 3 ? 5 : null;

// expect: no-unneeded-ternary
const unneededTernary = condition ? condition : null;

// expect: no-mixed-operators
const check = true && true || true || true;

const operatorLineBreak = 1
// expect: operator-linebreak
+
2;

// expect: curly
if (check > true)
  // expect: curly, nonblock-statement-body-position
  console.warn('No braces');
// expect: curly
else
  // expect: curly, nonblock-statement-body-position
  console.warn('No braces in else');

if (check > true) {
  console.warn('Do smth');
// expect: @stylistic/ts/brace-style
}
else {
  console.warn('Do smth else');
}

// expect: spaced-comment
//Comment without space

const indent = () => {
// expect: @stylistic/ts/indent
 console.warn('1 space');
  // expect: @stylistic/ts/indent
    console.warn('1 space');
};

// expect: @stylistic/ts/space-before-blocks, @stylistic/ts/keyword-spacing, padded-blocks, space-in-parens
if( condition > true){

  console.warn('Do smth else');
}

// expect: @stylistic/ts/space-infix-ops
const sum=5+5;

// expect: max-len
const longCode = condition > 5 && condition === true && condition < 3 && condition > 5 && condition > 5 && condition > 5 && condition > 5 && condition > 5;

// expect: @stylistic/ts/comma-spacing
const spacedComma = [1 , 2];

const computedPropObj = {};
// expect: computed-property-spacing
const computedProp = computedPropObj[ '@key' ];

const spacedKeys = {
  // expect: key-spacing
  a:1,
  // expect: key-spacing
  b : 1,
};
// expect: no-multiple-empty-lines



const multipleEmptyLines = 1;

const commaStyle = [
  1
  // expect: comma-style
  , 2
  // expect: comma-style
  , 2,
  // expect: @stylistic/ts/comma-dangle
  3
];
