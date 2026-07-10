import { execFileSync } from 'child_process';
import { fileURLToPath } from 'url';
import { resolve, dirname, join } from 'path';
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'fs';
import { tmpdir } from 'os';

const here = dirname(fileURLToPath(import.meta.url));
const oxfmtBin = resolve(here, '../node_modules/.bin/oxfmt');

const listDifferent = (args) => {
  try {
    const output = execFileSync(oxfmtBin, ['--list-different', ...args], { encoding: 'utf8' });
    return output.split('\n').filter(Boolean);
  } catch (error) {
    if (!error.stdout) throw error;
    return error.stdout.split('\n').filter(Boolean);
  }
};

// `test/valid` fixtures are already in the canonical style -- oxfmt should report
// zero of them as needing changes. `test/invalid` fixtures are deliberately
// mis-formatted -- oxfmt should report all of them as needing changes. Together
// this proves the shared config both matches, and actually enforces, our style.
const processDir = (configPath, dir) => {
  let isSuccess = true;

  const valid = listDifferent(['-c', configPath, join(dir, 'valid')]);
  if (valid.length) {
    console.error(`Errors found:\nAlready-formatted fixtures reported as needing changes: ${valid.join(', ')}`);
    isSuccess = false;
  }

  const invalidDir = resolve(dir, 'invalid');
  const invalidFiles = listDifferent(['-c', configPath, join(dir, 'invalid')]);
  if (!invalidFiles.length) {
    console.error(`Errors found:\nNo invalid fixtures were reported as needing changes under ${invalidDir}`);
    isSuccess = false;
  }

  return isSuccess;
};

// Regression test mirroring the same bug found against @entva/oxlint-config:
// `ignorePatterns` in the config JSON is resolved relative to the *config
// file's own directory*, so it never matches anything once this package is
// installed into `node_modules`. `--ignore-path` resolves relative to the
// CLI's cwd instead, so it's the only mechanism that works for installed
// consumers. This builds a fixture tree entirely outside the package.
const verifyIgnorePath = () => {
  const configPath = resolve(here, '../index.json');
  const ignorePath = resolve(here, '../ignore-patterns.txt');
  const projectDir = mkdtempSync(join(tmpdir(), 'oxfmt-ignore-path-'));

  mkdirSync(join(projectDir, 'src/migrations'), { recursive: true });
  writeFileSync(join(projectDir, 'src/migrations/gen.js'), 'const bad="1"\n');
  writeFileSync(join(projectDir, 'src/real.js'), 'const bad="1"\n');

  let isSuccess = true;

  try {
    const changed = listDifferent(['-c', configPath, '--ignore-path', ignorePath, projectDir]);

    if (changed.some((file) => file.includes('migrations'))) {
      console.error('Errors found:\n--ignore-path did not exclude the migrations directory');
      isSuccess = false;
    }
    if (!changed.some((file) => file.includes('real.js'))) {
      console.error('Errors found:\n--ignore-path excluded a file it should not have');
      isSuccess = false;
    }
  } finally {
    rmSync(projectDir, { recursive: true, force: true });
  }

  return isSuccess;
};

const run = (configPath, dir) => {
  const isSuccess = processDir(configPath, dir) && verifyIgnorePath();
  process.exit(isSuccess ? 0 : 1);
};

const [configName, dir = 'test'] = process.argv.slice(2);
run(resolve(here, '..', configName), resolve(here, '..', dir));
