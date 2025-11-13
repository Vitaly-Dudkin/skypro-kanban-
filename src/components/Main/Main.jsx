// src/components/Main/Main.jsx

import React from 'react';
import Column from '../Column/Column'; // ← импортируем Column
import { cardList } from '../../data.js';

const COLUMNS = [
  { title: 'Без статуса', status: 'Без статуса' },
  { title: 'Нужно сделать', status: 'Нужно сделать' },
  { title: 'В работе', status: 'В работе' },
  { title: 'Тестирование', status: 'Тестирование' },
  { title: 'Готово', status: 'Готово' },
];

const Main = () => {
  return (
    <main className="main">
      <div className="container">
        <div className="main__block">
          <div className="main__content">
            {COLUMNS.map(col => (
              <Column
                key={col.status}
                title={col.title}
                cards={cardList.filter(task => task.status === col.status)}
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Main;