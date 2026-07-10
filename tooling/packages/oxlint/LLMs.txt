# Migrating a project from ESLint to @entva/oxlint-config

## 1. Install

```bash
npm install --save-dev @entva/oxlint-config oxlint
```

Storybook? Also install `eslint-plugin-storybook`.

## 2. Pick the config file

| Project type | Config file |
| --- | --- |
| Plain JS/TS + React | `node_modules/@entva/oxlint-config/index.json` |
| Storybook | `node_modules/@entva/oxlint-config/storybook.json` |
| Next.js | `node_modules/@entva/oxlint-config/next.json` |
| Next.js + Storybook | `node_modules/@entva/oxlint-config/next-storybook.json` |

Point `-c` straight at the config file. Do not `extends` it from a local `.oxlintrc.json`.

## 3. Port project-specific rules

Check the project's old `eslint.config.js` for:
- Extra `rules` beyond the shared `eslint-config-entva-*` packages.
- Extra `ignores`/`ignorePatterns`.
- Plugins outside: `import`, `react`, `react-hooks`, `jsx-a11y`, `storybook`, `@stylistic`,
  `@typescript-eslint`, `@next/eslint-plugin-next`.

Re-add equivalents in a local oxlint config that `extends` this package's config file.

## 4. Fix disable comments

`eslint-disable*` directives work as-is -- do not rename them. What breaks is the **rule name**:
check `index.json` for the current id before assuming a comment is stale. A comment referencing
the wrong id doesn't error, it just silently fails to suppress, so the violation shows up as new.

| Old (ESLint) | New (oxlint) |
| --- | --- |
| Most `react/*` | `react-js/*` |
| `react/rules-of-hooks`, `react/exhaustive-deps` | native `react/*` |
| `import/order`, `import/no-extraneous-dependencies`, `import/no-import-module-exports`, `import/no-relative-packages`, `import/no-useless-path-segments` | `import-js/*` |
| Other `import/*` (`export`, `no-duplicates`, `first`, `no-cycle`, ...) | unchanged |
| `jsx-a11y/*` | unchanged |
| `@typescript-eslint/*` | `typescript/*` |
| `camelcase`, `no-restricted-syntax`, `one-var`, `strict`, `no-return-await`, `func-names` | `eslint-core/*` |
| everything else | unchanged |

## 5. Update npm scripts

```json
{
  "scripts": {
    "lint": "oxlint --type-aware -c node_modules/@entva/oxlint-config/next.json --ignore-path node_modules/@entva/oxlint-config/ignore-patterns.txt"
  }
}
```

## 6. Run and verify

```bash
npm run lint
```

If an error looks wrong, check the README's "Unsupported rules" table first.

## 7. Remove old ESLint setup

```bash
npm uninstall eslint eslint-config-entva-base eslint-config-entva eslint-config-entva-typescript eslint-config-entva-typescript-react eslint-config-entva-next
```

Delete `eslint.config.js` and any `.eslintignore`/`.eslintrc*` leftovers.
