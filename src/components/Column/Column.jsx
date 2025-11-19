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
            key={card.id}
            id={card.id}
            theme={card.theme}
            title={card.title}
            date={card.date}
          />
        ))}
      </CardsContainer>
    </ColumnContainer>
  );
};

export default Column;