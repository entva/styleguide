# AGENTS.md

This file provides guidance to coding agents when working with code in this repository.

## Development Patterns

- **Prefer composition over inheritance**: Use composable pieces over complex prop configurations
- **Prefer functional programming over object-oriented programming**: Use pure functions and immutable data structures
- Disabling linter rules, type checking or skipping tests is **not allowed**.
- Avoid native `enum`; use union types or `as const` objects instead.
- Prefer `type` aliases over `interface` for consistency.
- Infer return types from function calls where possible.
- In type literals, prefer commas over semicolons.
- Use of `any` for types is not allowed::
  1. Use implicit or built in types whenever possible
  2. Otherwise infer types
  3. Otherwise use generics
  4. Otherwise use `satisfies` type guard
  5. Otherwise typecast `as Type`
  6. Otherwise typecast `as unknown as Type` as last resort
- **Follow the style guide** (based on AirBnB's style guide):
  - CSS: https://github.com/entva/styleguide/blob/master/css/README.md
  - JavaScript: https://github.com/entva/styleguide/blob/master/javascript/README.md
  - TypeScript: https://github.com/entva/styleguide/blob/master/typescript/README.md
  - React: https://github.com/entva/styleguide/blob/master/react/README.md
- Always check for linting errors and type errors when finalizing code.
- **Comments**:
  - Never add comments that simply restate what the code does
  - Never add JSDoc comments that only describe obvious function behavior
  - Only add comments for complex algorithms, non-obvious business logic, or magic numbers that require explanation
  - Good: `const RRF_K = 60; // Reciprocal Rank Fusion constant per ParadeDB spec`
  - Bad: `// Get vector similarity score`, `// Returns SQL for a ranked search result`
  - When in doubt, omit the comment and use a clearer function or variable name instead
- **Always use verbose variable and function names** - instead of `i` use `index` etc.
- **Prefer minimal amout of code** - always try to keep changes to a minimum and new code to be as simple and as short as possible.

## Implementation Guidelines

Before starting any implementation task, always perform these steps:
1. Analyze existing codebase for coding style, architecture, and patterns
2. Analyze the problem and what needs to be done
3. Create a concise action plan and confirm it with the user

After completing any implementation task, always perform these steps:

1. **Run typecheck and lint** to catch errors
2. **Critically review the code** as a senior architect or a very senior developer, to ensure:
   - Naming consistent with codebase conventions
   - Filenames consistent with existing patterns
   - Structure consistent with surrounding code
   - Most terse code without repetition
   - Proper abstractions in place
   - Most elegant solution for the problem
   - Code is easy to understand and maintain
   - No obvious security vulnerabilities
3. **Refactor and clean up** based on the review, then **re-run typecheck and lint** to verify

**Why:** The user wants production-quality, codebase-consistent code — not just "working" code. A self-review step catches inconsistencies and inelegance before the user has to. You have to help the user be productive, not waste their time reviewing your pooly generated code.

**How to apply:** Treat this as a mandatory final phase of every implementation task. Do not consider the task done until this checklist is complete.
