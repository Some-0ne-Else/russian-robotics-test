import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styles from './Modal.module.css';
import ModalOverlay from '../ModalOverlay/ModalOverlay';

const modalRoot = document.getElementById('modal-root');
function Modal({ title, onClose, children }) {
  const handleClose = React.useCallback(
    (e) => {
      if (e.code !== 'Escape' && e.type === 'keydown') {
        return;
      }
      onClose();
    },
    [onClose],
  );
  React.useEffect(() => {
    document.addEventListener('keydown', handleClose);
    return () => document.removeEventListener('keydown', handleClose);
  }, [handleClose]);

  return ReactDOM.createPortal(
    <>
      <div className={styles.modal}>
        <button
          aria-label="close"
          type="button"
          onClick={onClose}
          className={`${styles['modal__close-button']}`}
        />
        <p className={styles.modal__title}>
          {title}
        </p>
        <div className={styles.modal__container}>
          {children}
        </div>
      </div>
      <ModalOverlay onClose={onClose} />
    </>,
    modalRoot,
  );
}

export default Modal;

Modal.propTypes = {
  title: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};
Modal.defaultProps = {
  title: '',
};
