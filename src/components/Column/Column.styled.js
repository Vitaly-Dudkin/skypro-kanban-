// src/components/Column/Column.styled.js
import styled from 'styled-components';

export const ColumnContainer = styled.div`
  width: 100%;
  max-width: 240px;
  display: flex;
  flex-direction: column;
  flex-shrink: 0; /* ← не сжимать колонки */

  @media (max-width: 1024px) {
    max-width: 220px;
  }

  @media (max-width: 768px) {
    max-width: 100%;
  }
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
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px; /* ← отступ между карточками */
`;