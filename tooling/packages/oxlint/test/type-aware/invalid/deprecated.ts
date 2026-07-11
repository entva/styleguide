// no-deprecated and no-implied-eval only run under --type-aware (needs TypeScript 7+
// and oxlint-tsgolint). Proves they fire when --type-aware is passed.

/** @deprecated use bar instead */
export const foo = (): void => {};
export const bar = (): void => {
  // expect: @typescript-eslint/no-deprecated
  foo();
};
export const implied = (input: string): void => {
  // expect: @typescript-eslint/no-implied-eval
  setTimeout(input, 100);
};
