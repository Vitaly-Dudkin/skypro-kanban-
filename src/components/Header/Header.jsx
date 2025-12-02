// src/components/Header/Header.jsx

import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [showExitModal, setShowExitModal] = useState(false);
  const userDropdownRef = useRef(null);
  const navigate = useNavigate();

  const toggleUserMenu = () => setIsUserMenuOpen((prev) => !prev);
  const closeUserMenu = () => setIsUserMenuOpen(false);

  // Закрытие меню при клике вне
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

  // Обработка создания задачи
  const handleCreateTask = () => {
    navigate('/task/new');
    if (onOpenPopNew) {
      onOpenPopNew();
    }
  };

  // Подтверждение выхода
  const handleConfirmLogout = () => {
    localStorage.removeItem('isAuth');
    if (setIsAuth) setIsAuth(false);
    navigate('/login', { replace: true });
    setShowExitModal(false);
    setIsUserMenuOpen(false);
  };

  // Открыть модалку подтверждения
  const handleLogoutClick = () => {
    setIsUserMenuOpen(false); // закрыть выпадающее меню
    setShowExitModal(true);
  };

  // Закрыть модалку подтверждения
  const closeExitModal = () => {
    setShowExitModal(false);
  };

  return (
    <HeaderContainer>
      <Container>
        <HeaderBlock>
          <Logo className="_show _light">
            <a href="" target="_self" rel="noopener noreferrer">
              <img src="/images/logo.png" alt="logo" />
            </a>
          </Logo>
          <Logo className="_dark">
            <a href="" target="_self" rel="noopener noreferrer">
              <img src="/images/logo_dark.png" alt="logo" />
            </a>
          </Logo>
          <Nav>
            <MainButton onClick={handleCreateTask}>
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
                    <input type="checkbox" name="checkbox" />
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

      {/* Модальное окно подтверждения выхода */}
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
                onClick={handleConfirmLogout}
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
                Да, выйти
              </button>
              <button
                onClick={closeExitModal}
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