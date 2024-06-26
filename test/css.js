const { join } = require('path');
const stylelint = require(require.resolve('stylelint', { paths: [process.cwd()] }));
const { collectLinterErrors, createTestErrorsCollector } = require('./utils');


const processFile = (result) => {
  const errorsLinter = result.warnings.reduce(collectLinterErrors, []);
  const errorsTest = errorsLinter.reduce(createTestErrorsCollector(result.source), []);

  if (errorsTest.length) throw `Errors found:\n${errorsTest.join('\n')}`;
};

module.exports = async (dir, exts = 'css,scss') => {
  try {
    const report = await stylelint.lint({
      files: exts.split(',').map((ext) => join(dir, `**/**.${ext}`)),
      quietDeprecationWarnings: true,
    });
    report.results.forEach(processFile);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};
