// src/components/Card/Card.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import {
  CardItem,
  CardWrapper,
  CardGroup,
  ThemeBadge,
  ThemeText,
  MenuButton,
  Dot,
  CardContent,
  CardTitle,
  DateContainer,
  DateText,
} from './Card.styled';

const formatDate = (dateStr) => {
  return new Date(dateStr).toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
  });
};

const CalendarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 13 13" fill="none">
    <g clipPath="url(#clip0_1_415)">
      <path
        d="M10.5625 2.03125H2.4375C1.7644 2.03125 1.21875 2.5769 1.21875 3.25V10.5625C1.21875 11.2356 1.7644 11.7812 2.4375 11.7812H10.5625C11.2356 11.7812 11.7812 11.2356 11.7812 10.5625V3.25C11.7812 2.5769 11.2356 2.03125 10.5625 2.03125Z"
        stroke="currentColor"
        strokeWidth="0.8"
        strokeLinejoin="round"
      />
      <path
        d="M11.7812 4.0625H1.21875M3.25 1.21875V2.03125V1.21875ZM9.75 1.21875V2.03125V1.21875Z"
        stroke="currentColor"
        strokeWidth="0.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_1_415">
        <rect width="13" height="13" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

const Card = ({ _id, topic, title, date }) => {
  const { theme } = useTheme();

  // Определяем класс фона
  const getBadgeBgClass = (topicValue) => {
    switch (topicValue) {
      case 'Web Design': return '_orange';
      case 'Research': return '_green';
      case 'Copywriting': return '_purple';
      default: return '_gray';
    }
  };

const getBadgeTextColor = (topicValue) => {
  // Всегда используем оригинальные цвета — независимо от темы
  switch (topicValue) {
    case 'Web Design': return '#FF6D00';
    case 'Research': return '#06B16E';
    case 'Copywriting': return '#9A48F1';
    default: return '#FFFFFF'; // белый только для серого/дефолтного
  }
};

  const badgeBgClass = getBadgeBgClass(topic);
  const badgeTextColor = getBadgeTextColor(topic);
  const formattedDate = formatDate(date);

  return (
    <CardItem>
      <CardWrapper>
        <CardGroup>
          <ThemeBadge $themeType={badgeBgClass} $textColor={badgeTextColor}>
            <ThemeText>{topic}</ThemeText>
          </ThemeBadge>
          <MenuButton as={Link} to={`/task/${_id}`}>
            <Dot />
            <Dot />
            <Dot />
          </MenuButton>
        </CardGroup>
        <CardContent>
          <Link to={`/task/${_id}`} style={{ textDecoration: 'none' }}>
            <CardTitle>{title}</CardTitle>
          </Link>
          <DateContainer>
            <CalendarIcon />
            <DateText>{formattedDate}</DateText>
          </DateContainer>
        </CardContent>
      </CardWrapper>
    </CardItem>
  );
};

export default Card; // ← КЛЮЧЕВОЙ ЭКСПОРТ