// react/react-compiler surfaces the same diagnostics as eslint-plugin-react-compiler,
// which eslint-config-next's core-web-vitals preset enables via eslint-plugin-react-hooks
// v7's granular rules (missing memo deps, setState-in-effect, etc., collapsed into one
// rule). Only next.json/next-storybook.json turn it on.
import { useState, useEffect } from 'react';

export const useReactToChanges = (data: string) => {
  const [error, setError] = useState('');
  // expect: react/react-compiler
  useEffect(() => { setError(''); }, [data]);
  return error;
};
