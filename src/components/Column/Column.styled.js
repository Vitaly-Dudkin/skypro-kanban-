// src/components/Column/Column.styled.js
import styled from 'styled-components';

export const ColumnContainer = styled.div`
  width: auto; /* ← не 100% */
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  padding: 0 8px; /* ← отступы между колонками */
`;

export const ColumnTitle = styled.div`
  padding: 0 10px;
  margin: 15px 0 10px;
`;

export const TitleText = styled.p`
  color: var(--text-secondary);
  font-size: 14px;
  font-weight: 600;
  line-height: 1;
  text-transform: uppercase;
`;

export const CardsContainer = styled.div`
  width: 220px; /* ← ширина колонки = ширине карточки */
  display: flex;
  flex-direction: column;
  gap: 8px;
`;