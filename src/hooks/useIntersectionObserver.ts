import { Dispatch, SetStateAction, useCallback, useEffect, useRef, useState } from 'react';

type ObserverOptions = {
  root: null;
  rootMargin: string;
  threshold: number;
};

type SetNode = Dispatch<SetStateAction<Element | null>>;

type Entry = IntersectionObserverEntry | Record<string, unknown>;

const initialOptions: ObserverOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.9,
};

const useIntersection = ({ root, rootMargin, threshold } = initialOptions): [SetNode, Entry] => {
  const [entry, setEntry] = useState<Entry>({});
  const [node, setNode] = useState<Element | null>(null);

  const observer = useRef<IntersectionObserver | null>(null);

  const observerCallback = useCallback(([element]) => setEntry(element), []);

  useEffect(() => {
    if (observer.current) {
      observer.current.disconnect();
    }

    observer.current = new IntersectionObserver(observerCallback, { root, rootMargin, threshold });

    if (node) {
      observer.current.observe(node);
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [node, observerCallback, root, rootMargin, threshold]);

  return [setNode, entry];
};

export default useIntersection;
