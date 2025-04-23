import React from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';

export default function ToastMessage({ show, onClose }) {
  return (
    <ToastContainer position="bottom-end" className="p-3">
      <Toast show={show} onClose={onClose} delay={3000} autohide bg="success">
        <Toast.Body className="text-white">Item added to cart!</Toast.Body>
      </Toast>
    </ToastContainer>
  );
}
