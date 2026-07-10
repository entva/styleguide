/* eslint-disable no-unused-vars */

class Person {
  // expect: no-useless-constructor, no-empty-function
  constructor() {}

  // expect: space-before-function-paren
  hello () {
  }
  // expect: lines-between-class-members
  walk() {}

  // TypeScript's own parser rejects this as a duplicate declaration before
  // no-dupe-class-members would ever run -- no oxlint diagnostic code to assert.
  walk() {}
}
