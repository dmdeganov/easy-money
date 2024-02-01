'use client';
import {useLayoutEffect, useState} from 'react';
import {mobileMaxWidth} from '@/config';
import {useDebounce} from '@/hooks/useDebounce';

const [initialWidth, initialHeight] = typeof window !== 'undefined' ? [window.innerWidth, window.innerHeight] : [0, 0];
export const useWindowSize = () => {
  const [windowDimensions, setWindowDimensions] = useState({
    width: initialWidth,
    height: initialHeight,
  });
  const handleResize = () => {
    setWindowDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  const debouncedHandleResize = useDebounce(handleResize, 50);

  useLayoutEffect(() => {
    window.addEventListener('resize', debouncedHandleResize);
    return (): void => window.removeEventListener('resize', debouncedHandleResize);
  }, []);

  return {
    width: windowDimensions.width,
    height: windowDimensions.height,
    isMobileWidth: windowDimensions.width <= mobileMaxWidth,
  };
};
