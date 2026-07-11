import { execFileSync } from 'child_process';
import { fileURLToPath } from 'url';
import { resolve, dirname, join } from 'path';
import { cpSync, mkdtempSync, rmSync } from 'fs';
import { tmpdir } from 'os';
// oxlint-disable-next-line import-js/no-relative-packages -- shared monorepo test helper
import { collectLinterErrors, createTestErrorsCollector } from '../../../../test/utils.js';

const here = dirname(fileURLToPath(import.meta.url));
const oxlintBin = resolve(here, '../node_modules/.bin/oxlint');

// Maps oxlint's jsPlugin aliases back to the rule id used in `// expect:` comments.
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

// Lints `dir` against `config` and checks each violation against that line's `// expect:`
// comment; a line with no comment is expected to be clean.
const processDir = (config, dir, extraArgs = []) => {
  const configPath = resolve(here, '..', config);
  const dirPath = resolve(here, dir);
  const { diagnostics } = runOxlintRaw([...extraArgs, '-c', configPath, '--format', 'json', dirPath]);
  const byFile = new Map();
  let isSuccess = true;

  diagnostics
    // Codeless diagnostics are either a parser error (ignore, not a rule) or a jsPlugin
    // crash (fail -- it silently stopped linting the file).
    .filter(({ code, message }) => {
      if (code) return true;
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

// `type-aware` needs its own pass: --type-aware requires TypeScript 7+ and oxlint-tsgolint.
const SUITES = [
  { config: 'index.json', dir: 'main' },
  { config: 'next.json', dir: 'next' },
  { config: 'next-storybook.json', dir: 'next-storybook' },
  { config: 'index.json', dir: 'type-aware', extraArgs: ['--type-aware'] },
];

// `ignorePatterns` in the config resolves relative to the config file's own directory, so
// it never matches once the config lives in node_modules of a separate project -- only
// `--ignore-path` (resolved relative to cwd) works there. Needs a fixture tree outside this
// package to reproduce; one under `test/` would put the config and project in the same place.
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
