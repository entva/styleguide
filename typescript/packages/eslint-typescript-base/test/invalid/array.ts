/* eslint-disable @typescript-eslint/no-unused-vars */

// expect: @typescript-eslint/no-array-constructor
const arrayInstance = new Array();

// expect: array-callback-return
const noReturn = [].filter((item) => {
  if (item) return true;
});

// expect: array-bracket-spacing, no-multi-spaces
const spacedArray = [  1, 2];
