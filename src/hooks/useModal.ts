'use client';
import {useState} from 'react';

export default function useModal<ModalData>() {
  const [isOpen, setIsOpen] = useState(false);
  const [modalData, setModalData] = useState<ModalData | null>(null);
  const open = () => setIsOpen(true);
  const toggle = () => {
    setIsOpen(!isOpen);
  };
  const close = () => {
    setIsOpen(false);
  };

  return {
    isOpen,
    open,
    toggle,
    close,
    modalData,
    setModalData,
  };
}
