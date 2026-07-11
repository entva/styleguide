import type { RefObject } from 'react';

const useEffect = () => {};

export const useMagicalFriendship = (layoutRef: RefObject<HTMLDivElement>) => (
  useEffect(() => {
    layoutRef.current.setAttribute('data-magical-friendship', 'true');
  }, [])
);
