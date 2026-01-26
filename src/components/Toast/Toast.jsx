// src/components/Toast/Toast.jsx
import { useState, useEffect } from 'react';
import styled from 'styled-components';

const ToastContainer = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 10000;
`;

const ToastItem = styled.div`
  background: ${({ type }) =>
    type === 'error' ? '#ffebee' : '#e8f5e9'};
  color: ${({ type }) =>
    type === 'error' ? '#c62828' : '#2e7d32'};
  border-left: 4px solid ${({ type }) =>
    type === 'error' ? '#f44336' : '#4caf50'};
  padding: 12px 16px;
  margin-bottom: 10px;
  border-radius: 4px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  font-size: 14px;
  max-width: 350px;
  animation: slideIn 0.3s ease-out;

  @keyframes slideIn {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
`;

export default function Toast({ message, type = 'error', onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <ToastContainer>
      <ToastItem type={type}>
        {message}
      </ToastItem>
    </ToastContainer>
  );
}