import { execFileSync } from 'child_process';
import { fileURLToPath } from 'url';
import { resolve, dirname, join } from 'path';
import { cpSync, mkdtempSync, rmSync } from 'fs';
import { tmpdir } from 'os';
import { collectLinterErrors, createTestErrorsCollector } from './assert.js';

const here = dirname(fileURLToPath(import.meta.url));
const oxlintBin = resolve(here, '../node_modules/.bin/oxlint');

// oxlint's jsPlugins report rules as "plugin(rule)". Map plugin aliases back to
// the canonical rule id used in `// expect:` fixture comments.
const PLUGIN_PREFIX = {
  stylistic: '',
  'eslint-core': '',
  eslint: '',
  node: '',
  'import-js': 'import/',
  'react-js': 'react/',
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

// Lints every fixture under `dir` against `config` in one pass and checks each violation
// against that file's `// expect:` comments. A fixture with no comment above a line is
// expected to have zero violations there -- "valid"/"invalid" subfolder names are purely
// organizational.
const processDir = (config, dir, extraArgs = []) => {
  const configPath = resolve(here, '..', config);
  const dirPath = resolve(here, dir);
  const { diagnostics } = runOxlintRaw([...extraArgs, '-c', configPath, '--format', 'json', dirPath]);
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

// Which fixture directory exercises which config. `type-aware` reuses index.json's rules
// but needs --type-aware (requires TypeScript 7+ and oxlint-tsgolint) plus its own
// tsconfig.json, so it can't share a pass with the rest of `main`.
const SUITES = [
  { config: 'index.json', dir: 'main' },
  { config: 'next.json', dir: 'next' },
  { config: 'next-storybook.json', dir: 'next-storybook' },
  { config: 'index.json', dir: 'type-aware', extraArgs: ['--type-aware'] },
];

// Regression test for a real bug found against external consumer projects:
// `ignorePatterns` in the config JSON is resolved relative to the *config
// file's own directory* (per oxlint's schema docs), so it never matches
// anything when the config lives in node_modules and the linted project is
// elsewhere. `--ignore-path` resolves relative to the CLI's cwd instead, so
// it's the only mechanism that works for installed-package consumers. This
// copies a static fixture tree entirely outside the package to reproduce that --
// a fixture living under `test/` would put the config dir and project dir in the
// same place, which can't reproduce the bug.
const verifyIgnorePath = () => {
  const configPath = resolve(here, '../index.json');
  const ignorePath = resolve(here, '../ignore-patterns.txt');
  const projectDir = mkdtempSync(join(tmpdir(), 'oxlint-ignore-path-'));

  let isSuccess = true;

  try {
    cpSync(resolve(here, 'ignore-path-fixture'), projectDir, { recursive: true });

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

const isSuccess = SUITES.every(({ config, dir, extraArgs }) => processDir(config, dir, extraArgs))
  && verifyIgnorePath();
process.exit(isSuccess ? 0 : 1);
