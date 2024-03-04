import React, { useEffect } from 'react';
import Modal from 'react-modal';
import { ModalProps } from 'components/Modal/types';
import { createPortal } from 'react-dom';

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
// FIXME: Enabling this is causing an error in the test. When commented out, it throws error in console when modal is called.
// Modal.setAppElement('#root');

export const ModalElement = ({
  isOpen, children, closeModal, style, centered = true, position = 1, shouldCloseOnOverlayClick = false,
}: ModalProps) => {
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }
  const centeredStyle = centered ? { display: 'flex', justifyContent: 'center', alignItems: 'center' } : {};

  useEffect(() => {
    if (isOpen) document.documentElement.style.overflow = 'hidden';
    else document.documentElement.style.overflow = 'auto';
    return () => { document.documentElement.style.overflow = 'auto'; };
  }, [isOpen]);

  const customStyles = {
    content: {
      border: 'none',
      height: 'auto',
      background: 'transparent',
      padding: 0,
      inset: 2,
      ...centeredStyle,
    },
    overlay: {
      zIndex: 5 * position,
      backgroundColor: 'rgba(43, 44, 45, 0.8)',
    },
  };

  return (
    <div>
      {typeof document !== 'undefined'
      && createPortal(
        <Modal
          isOpen={isOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          contentLabel="Example Modal"
          style={{ ...customStyles, ...style }}
          shouldCloseOnOverlayClick={shouldCloseOnOverlayClick}
        >
          {children}
        </Modal>,
        document.body,
      )}
    </div>
  );
};

export default ModalElement;
