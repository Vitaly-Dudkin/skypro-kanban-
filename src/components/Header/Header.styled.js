// src/components/Header/Header.styled.js

import styled from 'styled-components';

export const HeaderContainer = styled.header`
  width: 100%;
  background-color: #ffffff;
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

export const Logo = styled.div`
  img {
    width: 85px;
  }

  &._dark {
    display: none;
  }

  &._show._light {
    display: block;
  }
`;

export const Nav = styled.nav`
  max-width: 290px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const MainButton = styled.button`
  width: 178px;
  height: 30px;
  border-radius: 4px;
  background-color: #565eef;
  color: #ffffff;
  border: none;
  font-size: 14px;
  font-weight: 500;
  margin-right: 20px;
  cursor: pointer;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #33399b;
  }

  a {
    color: #ffffff;
    text-decoration: none;
    display: block;
    width: 100%;
    height: 100%;
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
  color: #565eef;
  cursor: pointer;
  outline: none;
  position: relative;

  &:hover,
  &:focus {
    color: #33399b;
  }

  &::after {
    content: '';
    display: block;
    width: 6px;
    height: 6px;
    border-radius: 1px;
    border-left: 1.9px solid #565eef;
    border-bottom: 1.9px solid #565eef;
    transform: rotate(-45deg);
    margin-left: 5px;
  }

  &:hover::after,
  &:focus::after {
    border-left-color: #33399b;
    border-bottom-color: #33399b;
  }
`;

export const UserMenu = styled.div`
  position: absolute;
  top: 61px;
  right: 0;
  width: 213px;
  min-height: 200px;
  border-radius: 10px;
  border: 0.7px solid rgba(148, 166, 190, 0.4);
  background: #fff;
  box-shadow: 0px 10px 39px 0px rgba(26, 56, 101, 0.21);
  padding: 34px;
  text-align: center;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  color: #94a6be;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  line-height: 1;

  &:hover {
    color: #000;
  }
`;

export const MenuName = styled.p`
  color: #000;
  font-size: 14px;
  font-weight: 500;
  line-height: 21px;
  letter-spacing: -0.14px;
  margin-bottom: 4px;
`;

export const MenuEmail = styled.p`
  color: #94a6be;
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
    color: #000;
    font-size: 14px;
    line-height: 21px;
    letter-spacing: -0.14px;
  }

  input[type='checkbox'] {
    position: relative;
    width: 36px;
    height: 16px;
    background: #eaee f6;
    background: #EAEEF6;
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
    background-color: #94a6be;
    transition: 0.3s ease;
  }

  input[type='checkbox']:checked::before {
    left: calc(100% - 14px);
    background-color: #565eef;
  }
`;

export const MenuExitButton = styled.button`
  width: auto;
  min-width: 72px;
  height: 30px;
  background: transparent;
  color: #565eef;
  border-radius: 4px;
  border: 1px solid #565eef;
  cursor: pointer;
  outline: none;
  font-size: 14px;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: auto;
  padding: 0 12px;

  a {
    color: #565eef;
    text-decoration: none;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }
`;