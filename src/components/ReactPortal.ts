'use client';
import {createPortal} from 'react-dom';
import React, {useEffect, useRef, useState} from 'react';

interface Props {
  children: React.ReactNode;
}
function ReactPortal({children}: Props) {
  const ref = useRef<Element | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    ref.current = document.getElementById('portal');
    setMounted(true);
  }, []);

  return mounted && ref.current ? createPortal(children, ref.current) : null;
}
export default ReactPortal;
