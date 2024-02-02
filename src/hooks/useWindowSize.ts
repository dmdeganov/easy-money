'use client';
import {useEffect, useState} from 'react';
import {mobileMaxWidth} from '@/config';
import {useDebounce} from '@/hooks/useDebounce';

export const useWindowSize = () => {
  const [initialWidth, initialHeight] =
    typeof window !== 'undefined' ? [window.innerWidth, window.innerHeight] : [0, 0];

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

  useEffect(() => {
    window.addEventListener('resize', debouncedHandleResize);
    return (): void => window.removeEventListener('resize', debouncedHandleResize);
  }, []);

  console.log(windowDimensions);

  return {
    width: windowDimensions.width,
    height: windowDimensions.height,
    isMobileWidth: windowDimensions.width <= mobileMaxWidth,
  };
};
