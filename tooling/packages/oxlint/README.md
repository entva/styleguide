# @entva/oxlint-config

> Shareable entva styleguide config for [oxlint](https://oxc.rs/docs/guide/usage/linter.html).

Bundles `eslint-config-entva-*` and its storybook/next.js supersets into one oxlint config.

Migrating from ESLint? See [LLMs.txt](./LLMs.txt).

## How to run

```bash
npm install --save-dev @entva/oxlint-config oxlint
```

Storybook? Also install `eslint-plugin-storybook` (optional peer dependency).

| Project type | Config file |
| --- | --- |
| Plain JS/TS + React (default) | `node_modules/@entva/oxlint-config/index.json` |
| Storybook | `node_modules/@entva/oxlint-config/storybook.json` |
| Next.js | `node_modules/@entva/oxlint-config/next.json` |
| Next.js + Storybook | `node_modules/@entva/oxlint-config/next-storybook.json` |

```json
{
  "scripts": {
    "lint": "oxlint --type-aware -c node_modules/@entva/oxlint-config/next.json --ignore-path node_modules/@entva/oxlint-config/ignore-patterns.txt"
  }
}
```

## Gotchas

- Point `-c` straight at the shipped config file. Don't wrap it in your own `.oxlintrc.json` via `"extends"`.
- Use `--ignore-path`, not the config's `ignorePatterns` field.
- Run from your project root -- a different `cwd` breaks `--ignore-path` matching.
- `--type-aware` needs TypeScript 7+. `oxlint-tsgolint` ships as a dependency, no separate install.

## Unsupported rules

| Rule | Why |
| --- | --- |
| `@typescript-eslint/naming-convention` | Not implemented in oxlint ([oxc#2180](https://github.com/oxc-project/oxc/issues/2180)) |
| `import/named` | oxlint's native rule skips `.ts`/`.tsx`, defers to `tsc` |
| `react/jsx-props-no-multi-spaces` | Crashes on any JSX element |
| `no-shadow` / `no-use-before-define` (TS-aware behavior) | No native `typescript/*` equivalent exists; falls back to the core JS rules, so enums, typedefs, and type/value shadowing aren't handled exactly like `@typescript-eslint` |
| `react/react-compiler` | Matches what `eslint-config-next`'s `core-web-vitals` preset enables via `eslint-plugin-react-hooks` v7 (missing memo deps, setState-in-effect, refs-during-render, etc.), but oxlint's version is a single rule with only one config option (`reportAllBailouts`) -- no way to disable individual diagnostic categories. Too noisy against real codebases to enable as one all-or-nothing switch. |
