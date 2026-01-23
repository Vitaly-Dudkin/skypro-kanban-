// src/components/Header/Header.styled.js
import styled from 'styled-components';

export const HeaderContainer = styled.header`
  width: 100%;
  background-color: var(--bg-card);
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
`;

export const Container = styled.div`
  max-width: 1260px;
  width: 100%;
  margin: 0 auto;
  padding: 0 30px;
`;

export const HeaderBlock = styled.div`
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
`;

// Логотип — один, но становится белым в тёмной теме
export const Logo = styled.div`
  img {
    width: 85px;
  }

  /* Делаем логотип белым в тёмной теме */
  [data-theme='dark'] & img {
    filter: brightness(0) invert(1);
  }
`;

export const Nav = styled.nav`
  max-width: 290px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;

export const MainButton = styled.button`
  width: 178px;
  height: 30px;
  border-radius: 4px;
  background-color: var(--primary-color);
  color: white; /* ← белый текст */
  border: none;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    background-color: var(--primary-hover);
    color: white; /* ← ОБЯЗАТЕЛЬНО! */
  }

  &.header-create-btn {
    /* просто класс для скрытия */
  }
`;

export const UserNameButton = styled.button`
  background: none;
  border: none;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  line-height: 20px;
  color: var(--text-color);
  cursor: pointer;
  position: relative;

  &:hover,
  &:focus {
    color: var(--primary-hover);
  }

  &::after {
    content: '';
    display: block;
    width: 6px;
    height: 6px;
    border-radius: 1px;
    border-left: 1.9px solid var(--text-color);
    border-bottom: 1.9px solid var(--text-color);
    transform: rotate(-45deg);
    margin-left: 5px;
  }

  &:hover::after,
  &:focus::after {
    border-left-color: var(--primary-hover);
    border-bottom-color: var(--primary-hover);
  }
`;

export const UserMenu = styled.div`
  position: absolute;
  top: 61px;
  right: 0;
  width: 213px;
  min-height: 200px;
  border-radius: 10px;
  border: 1px solid var(--border-color);
  background: var(--bg-card);
  box-shadow: 0px 10px 39px 0px rgba(0, 0, 0, 0.2);
  padding: 34px;
  text-align: center;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  color: var(--text-color);
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  color: var(--text-secondary);
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;

  &:hover {
    color: var(--text-color);
  }
`;

export const MenuName = styled.p`
  color: var(--text-color);
  font-size: 14px;
  font-weight: 500;
  line-height: 21px;
  letter-spacing: -0.14px;
  margin-bottom: 4px;
`;

export const MenuEmail = styled.p`
  color: var(--text-secondary);
  font-size: 14px;
  line-height: 21px;
  letter-spacing: -0.14px;
  margin-bottom: 10px;
`;

export const MenuTheme = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 10px 0 20px;
  width: 100%;
  justify-content: space-between;

  p {
    color: var(--text-color);
    font-size: 14px;
    line-height: 21px;
    letter-spacing: -0.14px;
  }

  input[type='checkbox'] {
    position: relative;
    width: 36px;
    height: 16px;
    background: var(--surface-color);
    border-radius: 8px;
    outline: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    cursor: pointer;
  }

  input[type='checkbox']::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 2px;
    transform: translateY(-50%);
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: var(--text-secondary);
    transition: 0.3s ease;
  }

  input[type='checkbox']:checked::before {
    left: calc(100% - 14px);
    background-color: var(--primary-color);
  }
`;

export const MenuExitButton = styled.button`
  width: auto;
  min-width: 72px;
  height: 30px;
  background: transparent;
  color: var(--primary-color);
  border-radius: 4px;
  border: 1px solid var(--primary-color);
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: auto;
  padding: 0 12px;
`;