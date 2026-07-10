import namedDefault from './named-as-default-source';

// expect: import/no-named-as-default-member
console.log(namedDefault.foo);

// expect: import/export
export * from './barrel-dup-source';
export const shared = 2;
