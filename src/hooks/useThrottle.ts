import {useCallback, useRef} from 'react';

export function useThrottle<F extends (...args: any) => any>(callback: F, delay = 16) {
  const isThrottled = useRef<null | boolean>(null);

  return useCallback(
    (...args: Parameters<F>) => {
      if (isThrottled.current) {
        console.log('event throttled')
        return;
      }
      callback(...args);
      isThrottled.current = true;
      setTimeout(() => (isThrottled.current = false), delay);
    },
    [callback, delay],
  );
}
