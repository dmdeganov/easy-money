'use client';
import React, {ReactNode} from 'react';
import ReactPortal from './ReactPortal';
import {AnimatePresence, motion} from 'framer-motion';

interface ModalType {
  children?: ReactNode;
  isOpen: boolean;
  close: () => void;
  fullScreenContent?: boolean;
}

export default function Modal({isOpen, close, children}: ModalType) {
  return (
    <ReactPortal>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            role="presentation"
            className="modal"
            onClick={close}
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </ReactPortal>
  );
}
