import React, { ReactNode, useEffect } from 'react';
import ReactDOM from 'react-dom';
import styles from './Modal.module.css';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}

const modalRoot = document.getElementById('modal-root');

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', handleEsc);

        return () => {
            window.removeEventListener('keydown', handleEsc);
        };
    }, [onClose]);

    if (!isOpen || !modalRoot) return null;

    return ReactDOM.createPortal(
        <div className={styles.overlay} onClick={onClose} data-testid="modal-overlay">
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}
                 data-testid="modal-content">
                <button onClick={onClose} className={styles.closeButton}>
                    &times;
                </button>
                <div className={styles.content}>
                    {children}
                </div>
            </div>
        </div>,
        modalRoot
    );
};

export default Modal;
