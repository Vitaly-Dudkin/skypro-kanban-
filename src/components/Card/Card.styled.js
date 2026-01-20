// src/components/Card/Card.styled.js
import styled from 'styled-components';

export const CardItem = styled.div`
  padding: 5px;
  animation-name: card-animation;
  animation-duration: 500ms;
  animation-timing-function: linear;

  @keyframes card-animation {
    0% {
      height: 0;
      opacity: 0;
    }
    100% {
      height: auto;
      opacity: 1;
    }
  }
`;

export const CardWrapper = styled.div`
  width: 220px;        /* ← фиксировано */
  height: 130px;       /* ← фиксировано */
  background-color: var(--bg-card);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  padding: 14px 12px;
  color: var(--text-color);
  flex-shrink: 0; /* ← не сжимать в колонке */

  @media (max-width: 768px) {
    width: 220px; /* ← остаётся 220px даже на мобилке */
    height: 130px;
  }
`;

export const CardGroup = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`;

export const ThemeBadge = styled.div`
  height: 20px;
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 10px;
  font-weight: 600;
  white-space: nowrap;
  background-color: ${(props) => {
    switch (props.$themeType) {
      case '_orange': return '#FFE4C2';
      case '_green': return '#B4FDD1';
      case '_purple': return '#E9D4FF';
      default: return '#94A6BE';
    }
  }};
  color: ${(props) => props.$textColor || '#FFFFFF'};
`;

export const ThemeText = styled.p`
  margin: 0;
  line-height: 1;
`;

export const MenuButton = styled.button`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 2px;
  background: none;
  border: none;
  cursor: pointer;
  flex-shrink: 0; /* ← не сжимается */
`;

export const Dot = styled.div`
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background-color: var(--text-secondary);
`;

export const CardContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  gap: 8px;
`;

export const CardTitle = styled.h3`
  font-size: 14px;
  font-weight: 500;
  line-height: 1.3;
  color: var(--text-color);
  margin: 0;
  word-break: break-word; /* ← перенос длинных слов */
  overflow-wrap: break-word;
`;

export const DateContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 6px;
  width: 100%;
`;

export const DateText = styled.p`
  font-size: 10px;
  line-height: 1.3;
  color: var(--text-secondary);
  letter-spacing: 0.2px;
  white-space: nowrap;
`;