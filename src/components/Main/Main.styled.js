// src/components/Main/Main.styled.js
import styled from 'styled-components';

export const MainWrapper = styled.main`
  background-color: var(--bg-board);
  padding: 0 16px; /* ← отступы на мобилке */
`;

export const MainContainer = styled.div`
  max-width: 1260px;
  width: 100%;
  margin: 0 auto;
  padding: 0;
`;

export const MainContent = styled.div`
  width: 100%;
  padding: 20px 0 40px;
`;

export const Board = styled.div`
  width: 100%;
  display: flex;
  gap: 16px; /* ← отступ между колонками */
  overflow-x: auto;
  padding: 0 8px 16px; /* ← отступы для скролла */
  -webkit-overflow-scrolling: touch; /* ← плавный скролл на iOS */

  /* Скрываем скроллбар (опционально) */
  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none; /* Firefox */
`;

export const LoadingText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  font-size: 18px;
  color: var(--primary-color);
  font-weight: 500;
`;