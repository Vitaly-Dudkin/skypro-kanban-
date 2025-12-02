// src/components/AuthForm.styled.js

import styled from 'styled-components';
import { Link } from 'react-router-dom'; // ← важно: импортируем Link здесь

export const AuthContainer = styled.div`
  padding: 20px;
`;

export const ModalBox = styled.div`
  max-width: 400px;
  margin: 0 auto;
  background: white;
  border-radius: 8px;
  padding: 30px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

export const Logo = styled.div`
  text-align: center;
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 20px;
  color: #000;
`;

export const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
  font-size: 20px;
  font-weight: 600;
  color: #000;
`;

export const InputWrapper = styled.div`
  margin-bottom: 16px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid ${(props) => (props.$hasError ? 'red' : '#ccc')};
  border-radius: 4px;
  font-size: 14px;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #565eef;
  }
`;

export const ErrorText = styled.span`
  color: red;
  font-size: 12px;
  display: block;
  margin-top: 4px;
`;

export const SubmitButton = styled.button`
  width: 100%;
  padding: 12px;
  background: ${(props) => (props.$disabled ? '#ccc' : '#565eef')};
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 500;
  cursor: ${(props) => (props.$disabled ? 'not-allowed' : 'pointer')};
  margin-top: 10px;
`;

export const SwitchLink = styled.p`
  text-align: center;
  margin-top: 20px;
  font-size: 14px;
  color: #000;
`;

export const LinkStyled = styled(Link)`
  color: #565eef;
  text-decoration: none;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
  }
`;