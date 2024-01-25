'use client';
import {useEffect, useState} from 'react';
import {mobileMaxWidth} from '@/config';
import {useDebounce} from '@/hooks/useDebounce';

export const useWindowSize = () => {
  const [windowDimensions, setWindowDimensions] = useState({
    width: 0,
    height: 0,
  });
  const handleResize = () => {
    setWindowDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  const debouncedHandleResize = useDebounce(handleResize, 50);

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', debouncedHandleResize);
    return (): void => window.removeEventListener('resize', debouncedHandleResize);
  }, []);

  return {
    width: windowDimensions.width,
    height: windowDimensions.height,
    isMobileWidth: windowDimensions.width <= mobileMaxWidth,
  };
};
