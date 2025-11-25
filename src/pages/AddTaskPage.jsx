// src/pages/AddTaskPage.jsx

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PopNewCard from '../components/PopNewCard/PopNewCard';

export default function AddTaskPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') navigate('/');
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return <PopNewCard onClose={() => navigate('/')} />;
}