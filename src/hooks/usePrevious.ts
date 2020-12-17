import { useEffect, useRef } from 'react';

const usePrevious = <T>(v: T): T | undefined => {
  const ref = useRef<T | undefined>();

  useEffect(() => {
    ref.current = v;
  }, [v]);

  return ref.current;
};

export default usePrevious;
