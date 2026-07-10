/* eslint-disable no-unused-vars */

// expect: no-array-constructor
const arrayInstance = new Array();

const noReturn = [].filter((item) => {
  // expect: array-callback-return
  if (item) return true;
});

// expect: array-bracket-spacing, no-multi-spaces
const spacedArray = [  1, 2];
