import React from 'react';
import { X, AlertTriangle } from 'lucide-react';
import './ConfirmModal.css';

const ConfirmModal = ({ 
    isOpen, 
    onClose, 
    onConfirm, 
    title, 
    message, 
    confirmText, 
    type = 'danger', // Puede ser 'danger' (rojo) o 'warning' (naranja/gris)
    isLoading 
}) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="modal-close-btn" onClick={onClose} disabled={isLoading}>
                    <X size={20} />
                </button>
                
                <div className={`modal-header-icon ${type}`}>
                    <AlertTriangle size={32} />
                </div>
                
                <h3 className="modal-title">{title}</h3>
                <p className="modal-message">{message}</p>
                
                <div className="modal-actions">
                    <button 
                        className="modal-btn cancel" 
                        onClick={onClose} 
                        disabled={isLoading}
                    >
                        CANCELAR
                    </button>
                    <button 
                        className={`modal-btn confirm ${type}`} 
                        onClick={onConfirm} 
                        disabled={isLoading}
                    >
                        {isLoading ? 'PROCESANDO...' : confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;