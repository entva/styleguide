import { execFileSync } from 'child_process';
import { fileURLToPath } from 'url';
import { resolve, dirname, join } from 'path';
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'fs';
import { tmpdir } from 'os';
// oxlint-disable-next-line import-js/no-relative-packages -- shared monorepo test helper
import { collectLinterErrors, createTestErrorsCollector } from '../../../../test/utils.js';

const here = dirname(fileURLToPath(import.meta.url));
const oxlintBin = resolve(here, '../node_modules/.bin/oxlint');

// oxlint's jsPlugins report rules as "plugin(rule)". Map plugin aliases back to
// the canonical rule id used in the ported `// expect:` fixture comments, so the
// existing eslint-base/eslint-react/eslint-typescript-* fixtures can be reused
// unchanged.
const PLUGIN_PREFIX = {
  stylistic: '',
  'eslint-core': '',
  eslint: '',
  node: '',
  'import-js': 'import/',
  'react-js': 'react/',
  'react-hooks-js': 'react-hooks/',
  'jsx-a11y-js': 'jsx-a11y/',
  typescript: '@typescript-eslint/',
  storybook: 'storybook/',
};

const canonicalRuleId = (code) => {
  const match = /^([\w-]+)\(([\w./-]+)\)$/.exec(code);
  if (!match) return code;
  const [, plugin, rule] = match;
  const prefix = plugin in PLUGIN_PREFIX ? PLUGIN_PREFIX[plugin] : `${plugin}/`;
  return `${prefix}${rule}`;
};

const runOxlintRaw = (args) => {
  try {
    const output = execFileSync(oxlintBin, args, { encoding: 'utf8', maxBuffer: 1024 * 1024 * 64 });
    return JSON.parse(output);
  } catch (error) {
    if (!error.stdout) throw error;
    return JSON.parse(error.stdout);
  }
};

const runOxlint = (configPath, dir) => runOxlintRaw(['-c', configPath, '--format', 'json', dir]);

const processDir = (configPath, dir) => {
  const { diagnostics } = runOxlint(configPath, dir);
  const byFile = new Map();
  let isSuccess = true;

  diagnostics
    // Parser/semantic diagnostics (e.g. TypeScript's own duplicate-declaration
    // check) have no rule "code" and aren't expressible as `// expect:` rules.
    .filter(({ code, message }) => {
      if (code) return true;
      // A jsPlugin crash also has no code -- unlike a legitimate codeless
      // parser diagnostic, it means a rule silently stopped linting a file.
      if (message.startsWith('Error running JS plugin')) {
        console.error(`Errors found:\n${message}`);
        isSuccess = false;
      }
      return false;
    })
    .forEach(({ code, labels, filename }) => {
      const ruleId = canonicalRuleId(code);
      const line = labels[0]?.span.line ?? 1;
      if (!byFile.has(filename)) byFile.set(filename, []);
      byFile.get(filename).push({ line, ruleId });
    });

  byFile.forEach((messages, filePath) => {
    const errorsLinter = messages.reduce(collectLinterErrors, []);
    const errorsTest = errorsLinter.reduce(createTestErrorsCollector(filePath), []);

    if (errorsTest.length) {
      console.error(`Errors found:\n${errorsTest.join('\n')}`);
      isSuccess = false;
    }
  });

  return isSuccess;
};

// Regression test for a real bug found against external consumer projects:
// `ignorePatterns` in the config JSON is resolved relative to the *config
// file's own directory* (per oxlint's schema docs), so it never matches
// anything when the config lives in node_modules and the linted project is
// elsewhere. `--ignore-path` resolves relative to the CLI's cwd instead, so
// it's the only mechanism that works for installed-package consumers. This
// builds a fixture tree entirely outside the package to reproduce that.
const verifyIgnorePath = () => {
  const configPath = resolve(here, '../index.json');
  const ignorePath = resolve(here, '../ignore-patterns.txt');
  const projectDir = mkdtempSync(join(tmpdir(), 'oxlint-ignore-path-'));

  mkdirSync(join(projectDir, 'src/app/(payload)/admin'), { recursive: true });
  writeFileSync(join(projectDir, 'src/app/(payload)/admin/generated.js'), 'var bad = 1;\n');
  writeFileSync(join(projectDir, '.hidden.js'), 'var bad = 1;\n');
  writeFileSync(join(projectDir, 'src/real.js'), 'var bad = 1;\n');

  let isSuccess = true;

  try {
    const { diagnostics } = runOxlintRaw(
      ['-c', configPath, '--ignore-path', ignorePath, '--format', 'json', projectDir],
    );
    const flaggedFiles = new Set(diagnostics.map(({ filename }) => filename));

    if ([...flaggedFiles].some((filename) => filename.includes('(payload)'))) {
      console.error('Errors found:\n--ignore-path did not exclude a (payload) directory');
      isSuccess = false;
    }
    if ([...flaggedFiles].some((filename) => filename.includes('.hidden.js'))) {
      console.error('Errors found:\n--ignore-path did not exclude a dotfile');
      isSuccess = false;
    }
    if (![...flaggedFiles].some((filename) => filename.includes('real.js'))) {
      console.error('Errors found:\n--ignore-path excluded a file it should not have');
      isSuccess = false;
    }
  } finally {
    rmSync(projectDir, { recursive: true, force: true });
  }

  return isSuccess;
};

// Regression test for `typescript/no-deprecated` and `typescript/no-implied-eval`: these are
// real, native oxlint rules, but they only run under `--type-aware` (requires TypeScript 7+ and
// the `oxlint-tsgolint` package). Left configured "error" so a consumer who opts into
// `--type-aware` gets them for free, while oxlint silently skips them without that flag -- so
// this only has to prove they fire when `--type-aware` is passed.
const verifyTypeAware = () => {
  const configPath = resolve(here, '../index.json');
  const projectDir = mkdtempSync(join(tmpdir(), 'oxlint-type-aware-'));

  writeFileSync(join(projectDir, 'tsconfig.json'), JSON.stringify({
    compilerOptions: {
      target: 'ES2022', module: 'ESNext', moduleResolution: 'bundler', strict: true,
    },
    include: ['**/*.ts'],
  }));
  writeFileSync(join(projectDir, 'deprecated.ts'), [
    '/** @deprecated use bar instead */',
    'export function foo(): void {}',
    'export function bar(): void { foo(); }',
    'export function implied(input: string): void { setTimeout(input, 100); }',
    '',
  ].join('\n'));
  // typescript/return-await with "in-try-catch": await is required inside
  // try/catch (for correct stack traces on rejection) and disallowed outside it.
  writeFileSync(join(projectDir, 'return-await.ts'), [
    'async function mayThrow(): Promise<number> { return 1; }',
    'export async function missingAwait(): Promise<number> {',
    '  try {',
    '    return mayThrow();',
    '  } catch (error) {',
    '    throw error;',
    '  }',
    '}',
    'export async function unnecessaryAwait(): Promise<number> {',
    '  return await mayThrow();',
    '}',
    '',
  ].join('\n'));

  let isSuccess = true;

  try {
    const { diagnostics } = runOxlintRaw(
      ['--type-aware', '-c', configPath, '--format', 'json', projectDir],
    );
    const codes = diagnostics.map(({ code }) => code);

    if (!codes.includes('typescript(no-deprecated)')) {
      console.error('Errors found:\ntypescript/no-deprecated did not fire under --type-aware');
      isSuccess = false;
    }
    if (!codes.includes('typescript(no-implied-eval)')) {
      console.error('Errors found:\ntypescript/no-implied-eval did not fire under --type-aware');
      isSuccess = false;
    }
    if (codes.filter((code) => code === 'typescript(return-await)').length !== 2) {
      console.error('Errors found:\ntypescript/return-await did not fire for both the missing-await-in-try-catch and unnecessary-await-outside-try-catch cases');
      isSuccess = false;
    }
  } finally {
    rmSync(projectDir, { recursive: true, force: true });
  }

  return isSuccess;
};

const run = (configPath, dir) => {
  const isSuccess = processDir(configPath, dir) && verifyIgnorePath() && verifyTypeAware();
  process.exit(isSuccess ? 0 : 1);
};

const [configName, dir = '.'] = process.argv.slice(2);
run(resolve(here, '..', configName), resolve(here, dir));
