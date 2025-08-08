/* eslint-disable @typescript-eslint/no-unused-vars */

class Person {
  // expect: @typescript-eslint/no-useless-constructor, @typescript-eslint/no-empty-function
  constructor() {}

  // expect: @stylistic/space-before-function-paren
  hello () {
  }
  // expect: @stylistic/lines-between-class-members
  walk() {}

  // expect: @typescript-eslint/no-dupe-class-members
  walk() {}
}
