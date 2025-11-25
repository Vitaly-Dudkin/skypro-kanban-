// src/components/Header/Header.jsx

import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
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

function Header({ onOpenPopNew }) {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
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
                  <MenuExitButton as={Link} to="/exit">
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