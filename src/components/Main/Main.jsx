// src/components/Main/Main.jsx

import React, { useState, useEffect } from 'react';
import Column from '../Column/Column';
import { cardList } from '../../data.js';
import { MainContainer, MainContent, Board, LoadingText } from './Main.styled';

const COLUMNS = [
  { title: 'Без статуса', status: 'Без статуса' },
  { title: 'Нужно сделать', status: 'Нужно сделать' },
  { title: 'В работе', status: 'В работе' },
  { title: 'Тестирование', status: 'Тестирование' },
  { title: 'Готово', status: 'Готово' },
];

const Main = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTasks(cardList);
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <MainContainer>
        <LoadingText>Данные загружаются…</LoadingText>
      </MainContainer>
    );
  }

  return (
    <MainContainer>
      <MainContent>
        <Board>
          {COLUMNS.map((col) => (
            <Column
              key={col.status}
              title={col.title}
              cards={tasks.filter((task) => task.status === col.status)}
            />
          ))}
        </Board>
      </MainContent>
    </MainContainer>
  );
};

export default Main;