'use client';
import React, {createContext} from 'react';
import {useWindowSize} from '@/hooks/useWindowSize';

export const WindowSizeContext = createContext({
  isMobileWidth: false,
  width: 0,
  height: 0,
});

export default function WindowSizeContextProvider({children}: {children: React.ReactNode}) {
  const {width, height, isMobileWidth} = useWindowSize();
  return <WindowSizeContext.Provider value={{isMobileWidth, width, height}}>{children}</WindowSizeContext.Provider>;
}
