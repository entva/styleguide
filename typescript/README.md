# TypeScript Style Guide

 In this document we outline coding preferences specific to TypeScript. Almost everything that is written in the [JavaScript](javascript/README.md) guide applies for TypeScript as well. It is always good to refresh your memory with the official language documentation [here](https://www.typescriptlang.org/docs/handbook/2/basic-types.html) and react specific guide [here](https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/function_components).

## Table of Contents

  1. [Use of Any](#any)
  1. [Use of Enum](#enum)
  1. [Namespaces](#namespaces)
  1. [Types vs Interfaces](#interfaces)
  1. [Global types](#globals)
  1. [React uses](#react)


## Use of Any
  <a name="any"></a>

  Use of `any` type is generally discouraged because it defeats the purpose of using TypeScript. However, there are some cases where it is necessary to use `any` type. For example, when you are using a third-party library that does not have type definitions, you can use `any` type to get around the type checking. In this case, you should always try to create a type definition for the library and use it instead of `any`.

  When writing generic functions that don't care about the argument type or internal structure prefer using `unknown`. This is a type-safe alternative to `any` that ensures someone using your function must perform some type of checking before using the argument.

**[⬆ back to top](#table-of-contents)**


## Use of Enum
  <a name="enum"></a>

  Using Enums is frowned upon when the same functionality can be accomplished with simple constants. In many cases single values need to be used in arrays or object types and converting enums to other structures becomes repetitive and cumbersome. Try using constants and only switch to enums when clear benefits are present.

**[⬆ back to top](#table-of-contents)**

## Namespaces
  <a name="namespaces"></a>

  Namespaces is a legacy feature that was introduced before there was a stable module system in place. Use ES Modules import/export statements instead.

**[⬆ back to top](#table-of-contents)**

## Types vs Interfaces
  <a name="interfaces"></a>

  Almost everything that can be accomplished with Interfaces can be accomplished with Types as well. We prefer using Types because the type declarations are more consistent and explicit this way. Only use an interface when you need the extensibility and you can't accomplish the same thing with simple types. More on the subject [here](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#differences-between-type-aliases-and-interfaces).

**[⬆ back to top](#table-of-contents)**

## Global types
  <a name="globals"></a>

  Some libraries like React are accompanied with type definitions that inject global types. This is a legacy feature from the times when there was no stable module system in place. This is no longer necessary and should be avoided. Instead, import the types from the library and use them as you would any other type. This way there is a clear dependency between your code and the library.

**[⬆ back to top](#table-of-contents)**

## React uses
  <a name="react"></a>

  Using React with TypeScript comes with it's own set of challenges. It is beneficial to read [react guide](https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/function_components) including the extended hints explanations.

  As a rule of thumb it is best to not use special types unless absolutely necessary and let TypeScript infer the types instead. For defining a React component in TypeScript this works great:

  ```typescript
  // you can also inline the type declaration; eliminates naming the prop types, but looks repetitive
  const App = ({ message }: { message: string }) => <div>{message}</div>;
  ```

**[⬆ back to top](#table-of-contents)**

