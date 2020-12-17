import { RefObject, useCallback, useEffect, useState } from 'react';

type TargetElement = HTMLElement | SVGSVGElement;

export const defaultChecker = (element: Element): boolean => {
  const { bottom, top } = element.getBoundingClientRect();
  const windowHeight = window.innerHeight || document.documentElement.clientHeight;
  return top > 0 && bottom > 0 && top < windowHeight && bottom < windowHeight;
};

const useInViewport = (element: RefObject<TargetElement>, check = defaultChecker): boolean => {
  const [inView, setInView] = useState(false);

  const handleScroll = useCallback(() => {
    const el = element.current;
    if (el) {
      if (check(el)) {
        setInView(true);
      } else {
        setInView(false);
      }
    }
  }, [check, element]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return (): void => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return inView;
};

export default useInViewport;
