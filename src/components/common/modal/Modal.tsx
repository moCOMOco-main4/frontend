'use client';

import useClickOutside from '@/hooks/useClickOutside';
import { modalStyleMap } from '@/components/common/modal/constants';
import { CircleX } from 'lucide-react';
import { useRef } from 'react';

type ModalProps = {
  children: React.ReactNode;
  variation?: 'chat' | 'menu' | 'notification';
  onClose: () => void;
};

const Modal = ({ children, variation = 'chat', onClose }: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  useClickOutside(modalRef, onClose);

  const modalSize = modalStyleMap[variation].size;
  const modalPosition = modalStyleMap[variation].position;
  const modalClass = `z-30 flex flex-col rounded-3xl bg-[#FBFFF1] p-4 shadow-xl transition-all duration-300 ease-out ${modalSize} ${modalPosition}`;

  return (
    <div ref={modalRef} className={modalClass} aria-label="modal">
      <CircleX
        stroke="gray"
        className="absolute right-3 top-3 cursor-pointer"
        onClick={onClose}
      />
      {children}
    </div>
  );
};

export default Modal;
