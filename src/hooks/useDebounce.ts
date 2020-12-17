import { useRef, useState } from 'react';

const useDebounce = <T>(debounceTime = 50): [T | null, (value: T) => void] => {
  const [value, setValue] = useState<T | null>(null);
  const debounce = useRef(0);

  const updater = (val: T) => {
    window.clearTimeout(debounce.current);

    debounce.current = window.setTimeout(() => setValue(val), debounceTime);
  };

  return [value, updater];
};

export default useDebounce;
