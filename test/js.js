import { resolve } from 'path';
import { collectLinterErrors, createTestErrorsCollector } from './utils.js';

const loadESLint = async () => {
  const cwd = process.cwd();
  const pkg = await import(resolve(cwd, 'node_modules/eslint'));
  console.log(pkg);
  const eslintPath = resolve(cwd, 'node_modules/eslint/lib/api.js');
  return import(eslintPath);
};

const processFile = (file) => {
  const errorsLinter = file.messages.reduce(collectLinterErrors, []);
  const errorsTest = errorsLinter.reduce(createTestErrorsCollector(file.filePath), []);

  if (errorsTest.length) {
    console.error(`Errors found:\n${errorsTest.join('\n')}`);
    return false;
  }

  return true;
};

const run = async (dir, ext = 'js') => {
  const { ESLint } = await loadESLint();
  const eslint = new ESLint({ overrideConfigFile: resolve(process.cwd(), 'index.js') });
  const result = await eslint.lintFiles(dir, `**/*.${ext}`);

  const isSuccess = result.map(processFile).every(r => r);

  process.exit(isSuccess ? 0 : 1)
};

export default run;
