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
  width: 220px;
  height: 130px;
  background-color: var(--bg-card); /* ← фон карточки */
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: stretch;
  padding: 15px 13px 19px;
  color: var(--text-color); /* ← основной текст */
`;

export const CardGroup = styled.div`
  width: 100%;
  height: 20px;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

// src/components/Card/Card.styled.js
export const ThemeBadge = styled.div`
  width: auto;
  height: 20px;
  padding: 5px 14px;
  border-radius: 18px;
  background-color: ${(props) => {
    switch (props.$themeType) {
      case '_orange': return '#FFE4C2';
      case '_green': return '#B4FDD1';
      case '_purple': return '#E9D4FF';
      case '_gray': return '#94A6BE';
      default: return '#94A6BE';
    }
  }};
  color: ${(props) => props.$textColor || '#FFFFFF'}; /* ← динамический цвет текста */
`;

export const ThemeText = styled.p`
  font-size: 10px;
  font-weight: 600;
  line-height: 10px;
  white-space: nowrap;
  margin: 0;
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
`;

export const Dot = styled.div`
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background-color: var(--text-secondary); /* ← вместо #94a6be */
`;

export const CardContent = styled.div`
  height: 64px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
`;

export const CardTitle = styled.h3`
  font-size: 14px;
  font-weight: 500;
  line-height: 18px;
  color: var(--text-color); /* ← вместо #000000 */
  margin-bottom: 10px;
  margin-top: 0;
`;

export const DateContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

export const DateText = styled.p`
  margin-left: 6px;
  font-size: 10px;
  line-height: 13px;
  color: var(--text-secondary); /* ← вместо #94a6be */
  letter-spacing: 0.2px;
`;