# @entva/oxfmt-config

> Shareable entva styleguide config for [oxfmt](https://oxc.rs/docs/guide/usage/formatter).

Matches the formatting conventions `@entva/oxlint-config` already enforces as lint errors
(quotes, semicolons, indent, line width, trailing commas) so `oxfmt` can auto-fix them instead.

## Not currently rolled out -- blocked

`oxfmt` forces semicolons as the delimiter in TS interfaces/type literals (`{ a: string; b: number }`),
inherited unconditionally from Prettier. There is no config option for this -- checked the entire
schema, no `delimiter`/`separator`/`interface`-related key exists. This styleguide uses commas in
type literals (see `stylistic/member-delimiter-style` in `@entva/oxlint-config`, and the top-level
CLAUDE.md convention), so running `oxfmt` on any real project would rewrite every interface/type
literal to semicolons on first run, fighting our own lint rule.

The config and tests here are otherwise complete and correct -- kept in the repo so it's ready to
wire into consumers the moment oxfmt exposes a way to keep commas in type literals.

## How to run

```bash
npm install --save-dev @entva/oxfmt-config oxfmt
```

```json
{
  "scripts": {
    "format": "oxfmt -c node_modules/@entva/oxfmt-config/index.json --ignore-path node_modules/@entva/oxfmt-config/ignore-patterns.txt",
    "format:check": "npm run format -- --check"
  }
}
```

## Gotchas

- Point `-c` straight at the shipped config file.
- Use `--ignore-path`, not the config's `ignorePatterns` field -- same bug as oxlint: it resolves
  relative to the config file's own directory, not your project, once this package lives in
  `node_modules`.
- Run from your project root -- a different `cwd` breaks `--ignore-path` matching.
- One config for every project type -- unlike oxlint, formatting doesn't vary by framework, so
  there's no `storybook`/`next` variant.

## Options deliberately left off

| Option | Why |
| --- | --- |
| `sortImports` | Already handled by oxlint's `import/order` -- enabling both would fight each other |

`sortPackageJson` is left enabled (default `true`) -- consistent, sorted `package.json` keys are
worth having.
