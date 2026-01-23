// src/components/Header/Header.jsx
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import {
  HeaderContainer,
  Container,
  HeaderBlock,
  Logo,
  Nav,
  MainButton,
  UserNameButton,
  UserMenu,
  CloseButton,
  MenuName,
  MenuEmail,
  MenuTheme,
  MenuExitButton,
} from './Header.styled';

function Header({ onOpenPopNew, setIsAuth }) {
  const { theme, toggleTheme } = useTheme();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [showExitModal, setShowExitModal] = useState(false);
  const userDropdownRef = useRef(null);
  const navigate = useNavigate();

  const toggleUserMenu = () => setIsUserMenuOpen((prev) => !prev);
  const closeUserMenu = () => setIsUserMenuOpen(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleCreateTask = () => {
    navigate('/task/new');
    if (onOpenPopNew) {
      onOpenPopNew();
    }
  };

  const handleConfirmLogout = () => {
    localStorage.removeItem('isAuth');
    if (setIsAuth) setIsAuth(false);
    navigate('/login', { replace: true });
    setShowExitModal(false);
    setIsUserMenuOpen(false);
  };

  const handleLogoutClick = () => {
    setIsUserMenuOpen(false);
    setShowExitModal(true);
  };

  const closeExitModal = () => {
    setShowExitModal(false);
  };

  return (
    <HeaderContainer>
      <Container>
        <HeaderBlock>
          {/* Один логотип — фильтр делает его белым в тёмной теме */}
          <Logo>
            <a href="/" rel="noopener noreferrer">
              <img src="/images/logo.png" alt="logo" />
            </a>
          </Logo>

          <Nav>
            <MainButton className="header-create-btn" onClick={handleCreateTask}>
              Создать новую задачу
            </MainButton>

            <div ref={userDropdownRef} style={{ position: 'relative' }}>
              <UserNameButton onClick={toggleUserMenu}>
                Ivan Ivanov
              </UserNameButton>

              {isUserMenuOpen && (
                <UserMenu>
                  <CloseButton onClick={closeUserMenu} aria-label="Закрыть">
                    &times;
                  </CloseButton>
                  <MenuName>Ivan Ivanov</MenuName>
                  <MenuEmail>ivan.ivanov@gmail.com</MenuEmail>
                  <MenuTheme>
                    <p>Темная тема</p>
                    <input
                      type="checkbox"
                      checked={theme === 'dark'}
                      onChange={toggleTheme}
                    />
                  </MenuTheme>
                  <MenuExitButton onClick={handleLogoutClick}>
                    Выйти
                  </MenuExitButton>
                </UserMenu>
              )}
            </div>
          </Nav>
        </HeaderBlock>
      </Container>

      {/* Модальное окно выхода — с поддержкой темы */}
      {showExitModal && (
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
            zIndex: 1001,
          }}
          onClick={closeExitModal}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: 'var(--bg-card)',
              color: 'var(--text-color)',
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
                onClick={handleConfirmLogout}
                style={{
                  width: '153px',
                  height: '30px',
                  background: 'var(--primary-color)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                Да, выйти
              </button>
              <button
                onClick={closeExitModal}
                style={{
                  width: '153px',
                  height: '30px',
                  background: 'transparent',
                  color: 'var(--primary-color)',
                  border: '1px solid var(--primary-color)',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                Нет, остаться
              </button>
            </div>
          </div>
        </div>
      )}
    </HeaderContainer>
  );
}

export default Header;