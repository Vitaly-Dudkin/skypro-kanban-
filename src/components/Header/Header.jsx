// src/components/Header/Header.jsx

import React, { useState, useRef, useEffect } from 'react';

function Header() {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);

  // Закрытие при клике вне окна
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };

    if (isUserMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isUserMenuOpen]);

  const toggleUserMenu = () => {
    setIsUserMenuOpen((prev) => !prev);
  };

  const closeUserMenu = () => {
    setIsUserMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header__block">
          <div className="header__logo _show _light">
            <a href="" target="_self" rel="noopener noreferrer">
              <img src="/images/logo.png" alt="logo" />
            </a>
          </div>
          <div className="header__logo _dark">
            <a href="" target="_self" rel="noopener noreferrer">
              <img src="/images/logo_dark.png" alt="logo" />
            </a>
          </div>
          <nav className="header__nav">
            <button className="header__btn-main-new _hover01">
              <a href="#popNewCard">Создать новую задачу</a>
            </button>

            <button
              className="header__user _hover02"
              onClick={toggleUserMenu}
              aria-haspopup="true"
              aria-expanded={isUserMenuOpen}
            >
              Ivan Ivanov
            </button>

            {/* Всплывающее окно всегда в DOM, но скрыто/показано через класс */}
            <div
              className={`header__pop-user-set pop-user-set ${
                isUserMenuOpen ? 'pop-user-set--open' : ''
              }`}
              ref={userMenuRef}
            >
              {/* Крестик */}
              <button
                onClick={closeUserMenu}
                className="pop-user-set__close"
                aria-label="Закрыть"
              >
                &times;
              </button>

              <p className="pop-user-set__name">Ivan Ivanov</p>
              <p className="pop-user-set__mail">ivan.ivanov@gmail.com</p>
              <div className="pop-user-set__theme">
                <p>Темная тема</p>
                <input type="checkbox" className="checkbox" name="checkbox" />
              </div>
              <button type="button" className="_hover03" onClick={closeUserMenu}>
                <a href="#popExit">Выйти</a>
              </button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;