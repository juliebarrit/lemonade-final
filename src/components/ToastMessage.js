import React from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';

export default function ToastMessage({ show, onClose, message }) {
  return (
    <ToastContainer 
      position="bottom-end" 
      className="p-3"
      style={{ zIndex: 1056 }}
    >
      <Toast 
        show={show} 
        onClose={onClose} 
        delay={3000} 
        autohide
      >
        <Toast.Body className="d-flex align-items-center">
          <span className="me-2">✓</span>
          {message || 'Produkt tilføjet til kurven!'}
        </Toast.Body>
        <style jsx>{`
          :global(.toast) {
            background: #333;
            color: white;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          }
          :global(.toast-body) {
            padding: 12px 16px;
            font-size: 14px;
          }
        `}</style>
      </Toast>
    </ToastContainer>
  );
}
