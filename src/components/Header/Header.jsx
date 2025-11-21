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

function Header() {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userDropdownRef = useRef(null);
  const navigate = useNavigate();

  const toggleUserMenu = () => setIsUserMenuOpen((prev) => !prev);
  const closeUserMenu = () => setIsUserMenuOpen(false);

  const handleLogout = () => {
    // Удаляем данные авторизации
    localStorage.removeItem('isAuth');
    // Закрываем меню
    setIsUserMenuOpen(false);
    // Перенаправляем на страницу входа
    navigate('/login', { replace: true });
  };

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
            <MainButton as="a" href="#popNewCard">
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
                  <MenuExitButton onClick={handleLogout}>
                    Выйти
                  </MenuExitButton>
                </UserMenu>
              )}
            </div>
          </Nav>
        </HeaderBlock>
      </Container>
    </HeaderContainer>
  );
}

export default Header;