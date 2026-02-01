import React from 'react';
import ReactDOM from 'react-dom';
import '../../styles/Modal.css';

const Modal = ({ 
    isOpen, 
    onClose, 
    title, 
    children, 
    size = 'medium',
    showCloseButton = true 
}) => {
    if (!isOpen) return null;

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const modalContent = (
        <div className="modal-backdrop" onClick={handleBackdropClick}>
            <div className={`modal-content ${size}`}>
                {(title || showCloseButton) && (
                    <div className="modal-header">
                        {title && <h2 className="modal-title">{title}</h2>}
                        {showCloseButton && (
                            <button 
                                className="modal-close" 
                                onClick={onClose}
                                aria-label="Close modal"
                            >
                                ×
                            </button>
                        )}
                    </div>
                )}
                <div className="modal-body">
                    {children}
                </div>
            </div>
        </div>
    );

    return ReactDOM.createPortal(
        modalContent,
        document.body
    );
};

export default Modal;
    