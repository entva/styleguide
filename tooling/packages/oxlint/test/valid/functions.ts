/* eslint-disable no-unused-vars */

const noDestruction = (data) => {
  const open = data.open;
  open();
};

const inconsistentReturn = () => {
  if (noDestruction === 1) return true;
};


const returnInCurly = (a) => a;

if (returnInCurly === 1) {
  const blockScope = () => 'Hello';
}

const spacedFunc = function() {};

const argsArray = [1, 2, 3];
console.log(...argsArray);

[].map(() => 1);

const arrowInArrow = () => (argsArray >= 1 ? 1 : 2);

const lineBreak = () => (
  1
);

const conditionReturn = (arg) => {
  if (arg) {
    return true;
  }
  return false;
};

// func-names runs via the real ESLint rule (eslint-core-shim) instead of oxlint's native
// implementation, which misfires on TS overload signatures -- guards against that regressing
export function overloaded(a: number): number;
export function overloaded(a: string): string;
export function overloaded(a: unknown): unknown {
  return a;
}
