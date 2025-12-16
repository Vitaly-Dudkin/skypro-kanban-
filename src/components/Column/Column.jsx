// src/components/Column/Column.jsx

import React from 'react';
import Card from '../Card/Card';
import { ColumnContainer, ColumnTitle, TitleText, CardsContainer } from './Column.styled';

const Column = ({ title, cards }) => {
  return (
    <ColumnContainer>
      <ColumnTitle>
        <TitleText>{title}</TitleText>
      </ColumnTitle>
      <CardsContainer>
        {cards.map((card) => (
          <Card
            key={card._id}        // ← уникальный ключ из API
            _id={card._id}        // ← передаём _id, а не id
            topic={card.topic}
            title={card.title}
            date={card.date}
          />
        ))}
      </CardsContainer>
    </ColumnContainer>
  );
};

export default Column;