import { useState, useEffect, useCallback } from 'react';

export const useMagicalFriendship = (layoutRef) => (
  useEffect(() => {
    layoutRef.current.setModal(<article>hey dude</article>);
  }, [])
);

export const useReactToChanges = (data) => {
  const [error, setError] = useState('');
  useEffect(() => { setError(''); }, [data]);
  return error;
};

export const usePartialMemoization = () => {
  const [value, setValue] = useState();
  const callback = useCallback(() => {
    setValue((currentValue) => currentValue * 100);
  }, []);

  return [value, callback];
};
