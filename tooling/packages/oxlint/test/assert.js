import { readFileSync } from 'fs';
import { relative } from 'path';

// Matches `// expect: rule-a, rule-b` comments above a violation against oxlint's actual
// diagnostics for that line. A file with no `// expect:` comment above a line is expected
// to have zero violations there.
const specPrefix = '// expect:';

const arrayDiff = (arr, compareArr) => arr.filter((entry) => !compareArr.includes(entry));
const formatError = (filePath, line, message) => (
  `[${relative(process.cwd(), filePath)}:${line}] ${message}`
);

const parseSpec = (spec) => {
  if (!spec || !spec.includes(specPrefix)) return [];

  const rules = spec.replace(specPrefix, '');
  return rules.split(',').map((rule) => rule.trim());
};

const findSpecLineIndex = (line, fileLines) => {
  const mayBeFileError = line === 1;
  if (mayBeFileError) return 0;

  for (let index = line - 2; index >= 0; index -= 1) {
    if (!fileLines[index].trim()) continue;
    return index;
  }

  return line - 2;
};

export const collectLinterErrors = (accumulator, { line, ruleId }) => {
  const lineRecord = accumulator.find((item) => item.line === line);

  if (lineRecord) {
    lineRecord.rules.push(ruleId);
  } else {
    accumulator.push({ line, rules: [ruleId] });
  }

  return accumulator;
};

export const createTestErrorsCollector = (filePath) => {
  const fileLines = readFileSync(filePath, 'utf8').split('\n');

  return (accumulator, { line, rules }) => {
    const specLineIndex = findSpecLineIndex(line, fileLines);
    const specRules = parseSpec(fileLines[specLineIndex]);

    const notCheckedRules = arrayDiff(specRules, rules);
    const extraCheckedRules = arrayDiff(rules, specRules);

    if (notCheckedRules.length) {
      accumulator.push(formatError(filePath, line, `Linter should check these rules: ${notCheckedRules.join(', ')}`));
    }

    if (extraCheckedRules.length) {
      accumulator.push(formatError(filePath, line, `Linter should not check these rules: ${extraCheckedRules.join(', ')}`));
    }

    return accumulator;
  };
};
