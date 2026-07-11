import { builtinRules } from 'eslint/use-at-your-own-risk';

// Exposes eslint's own builtinRules as an oxlint jsPlugin so the handful of core rules
// oxlint hasn't natively implemented yet keep firing with their real, original behavior
// instead of being dropped. Rules actually in use (via `eslint-core/*` in index.json):
// no-restricted-syntax, strict, no-new-symbol, camelcase, lines-around-directive, one-var,
// no-new-object, no-buffer-constructor, no-dupe-args, no-octal, no-octal-escape, func-names.
export default { rules: Object.fromEntries(builtinRules) };
