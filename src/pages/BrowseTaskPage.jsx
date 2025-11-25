// src/pages/BrowseTaskPage.jsx

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PopBrowse from '../components/PopBrowse/PopBrowse';

export default function BrowseTaskPage() {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate('/');
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onClick={handleClose}
    >
      <div onClick={(e) => e.stopPropagation()} style={{ width: '100%' }}>
        <PopBrowse />
      </div>
    </div>
  );
}