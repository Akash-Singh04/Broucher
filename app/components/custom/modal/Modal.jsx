import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import cls from './Modal.module.css';

const Modal = ({ title, children, open, closeModal }) => {
  return (
    <Dialog.Root open={open} onOpenChange={closeModal} className={cls.DialogRoot}>
      <Dialog.Portal>
        <Dialog.Overlay className={cls.DialogOverlay} />
        <Dialog.Content className={cls.DialogContent}>
          <Dialog.Title className="modalTitle">{title}</Dialog.Title>
          {children}
          <Dialog.Close asChild>
            <button className={cls.IconButton} aria-label="Close">
              <Cross2Icon />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Modal;
