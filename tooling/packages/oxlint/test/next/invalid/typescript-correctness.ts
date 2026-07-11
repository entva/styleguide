// next.json mirrors eslint-config-next/typescript's recommended TypeScript correctness
// rules, which index.json doesn't enable (its `correctness` category is off). These
// rules only matter for Next.js projects.

// expect: @typescript-eslint/ban-ts-comment
// @ts-ignore
const a: string = 1;

// expect: @typescript-eslint/no-duplicate-enum-values
enum Color { Red = 1, Blue = 1 }

console.log(a, Color);
