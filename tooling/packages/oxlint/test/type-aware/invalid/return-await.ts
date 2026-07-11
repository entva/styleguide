// return-await with "in-try-catch": await is required inside try/catch (for correct
// stack traces on rejection) and disallowed outside it. Also only runs under --type-aware.
const mayThrow = async (): Promise<number> => 1;

export const missingAwait = async (): Promise<number> => {
  try {
    // expect: @typescript-eslint/return-await
    return mayThrow();
  } catch (error) {
    console.error('mayThrow failed', error);
    throw error;
  }
};

// expect: @typescript-eslint/return-await
export const unnecessaryAwait = async (): Promise<number> => await mayThrow();
