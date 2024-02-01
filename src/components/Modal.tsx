'use client'
import React, {ReactNode, useRef} from 'react';
import ReactPortal from './ReactPortal';
import {CSSTransition} from 'react-transition-group';

interface ModalType {
  children?: ReactNode;
  isOpen: boolean;
  close: () => void;
  fullScreenContent?: boolean;
  className?: string;
}

export default function Modal({isOpen, close, className, children}: ModalType) {
  const nodeRef = useRef(null);

  return (
    <ReactPortal>
      <CSSTransition in={isOpen} timeout={{enter: 0, exit: 300}} unmountOnExit classNames="modal" nodeRef={nodeRef}>
        <div role='presentation' className={`modal${className ? ` ${className}`: ''}`} ref={nodeRef} onClick={close}>
          {children}
        </div>
      </CSSTransition>
    </ReactPortal>
  );
}
