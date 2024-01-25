import {useCallback, useRef} from 'react';

// eslint-disable-next-line @typescript-eslint/ban-types
export function useDebounce(callback: Function, delay = 500) {
  const timer = useRef<null | ReturnType<typeof setTimeout>>(null);

  return useCallback(
    (...args: any) => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
      timer.current = setTimeout(() => {
        callback(...args);
      }, delay);
      return timer.current;
    },
    [callback, delay],
  );
}
