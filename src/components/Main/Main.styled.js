// src/components/Main/Main.styled.js

import styled from 'styled-components';

export const MainWrapper = styled.main`
  background-color: var(--bg-board);
`;

export const TitleText = styled.p`
  color: var(--text-secondary); /* ← CSS-переменная */
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
`;

export const MainContainer = styled.div`
  max-width: 1260px;   /* как в старом .container */
  width: 100%;
  margin: 0 auto;
  padding: 0 30px;
`;

export const MainContent = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 25px 0 49px;
`;

export const Board = styled.div`
  width: 100%;
  display: flex;
  gap: 24px; /* небольшой отступ между колонками (по желанию) */
`;

export const LoadingText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  font-size: 18px;
  color: #565eef;
  font-weight: 500;
`;