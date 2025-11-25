// src/pages/ExitPage.jsx

import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function ExitPage() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isAuth');
    navigate('/login', { replace: true });
  };

  const handleCancel = () => {
    navigate(-1); // возврат назад
  };

  // Закрытие по Esc
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') handleCancel();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0,0,0,0.4)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
      }}
      onClick={handleCancel}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'white',
          padding: '50px 60px',
          borderRadius: '10px',
          maxWidth: '370px',
          width: '90%',
          textAlign: 'center',
        }}
      >
        <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '20px' }}>
          Вы уверены, что хотите выйти?
        </h2>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
          <button
            onClick={handleLogout}
            style={{
              width: '153px',
              height: '30px',
              background: '#565EEF',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Да
          </button>
          <button
            onClick={handleCancel}
            style={{
              width: '153px',
              height: '30px',
              background: 'transparent',
              color: '#565EEF',
              border: '0.7px solid #565EEF',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Нет
          </button>
        </div>
      </div>
    </div>
  );
}