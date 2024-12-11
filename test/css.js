import { resolve } from 'path';
import fs from 'fs';
import { collectLinterErrors, createTestErrorsCollector } from './utils.js';

// ESM is very convenient and doesn't require any workarounds for the CJS dynamic import
const loadStyleLint = async () => {
  const cwd = process.cwd();
  const pkg = JSON.parse(fs.readFileSync(resolve(cwd, 'node_modules/stylelint/package.json'), 'utf8'));
  const styleLint = resolve(cwd, 'node_modules/stylelint', pkg.main);
  const mod = await import(styleLint);
  return mod.default;
};


const processFile = (result) => {
  const errorsLinter = result.warnings.reduce(collectLinterErrors, []);
  const errorsTest = errorsLinter.reduce(createTestErrorsCollector(result.source), []);

  if (errorsTest.length) throw `Errors found:\n${errorsTest.join('\n')}`;
};

const run = async (dir, exts = 'css,scss') => {
  const stylelint = await loadStyleLint();
  try {
    const report = await stylelint.lint({
      files: exts.split(',').map((ext) => `${dir}/**/*.${ext}`),
      quietDeprecationWarnings: true,
    });
    report.results.forEach(processFile);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

export default run;
