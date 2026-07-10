import { builtinRules } from 'eslint/use-at-your-own-risk';

// A handful of ESLint core rules aren't implemented natively by oxlint yet.
// Exposing eslint's own builtinRules as an oxlint jsPlugin keeps these rules
// firing with their real, original implementation instead of dropping them.
export default { rules: Object.fromEntries(builtinRules) };
