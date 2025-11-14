// src/components/Main/Main.jsx

import React, { useState, useEffect } from 'react';
import Column from '../Column/Column';
import { cardList } from '../../data.js'; // синхронный импорт

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
    // Имитируем задержку загрузки (например, запрос к API)
    const timer = setTimeout(() => {
      setTasks(cardList);       // загружаем данные
      setIsLoading(false);      // скрываем "загрузку"
    }, 800); // 0.8 секунды — для наглядности

    // Очистка таймера при размонтировании (хорошая практика)
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <main className="main">
        <div className="main__loading">
          Данные загружаются…
        </div>
      </main>
    );
  }

  return (
    <main className="main">
      <div className="container">
        <div className="main__block">
          <div className="main__content">
            {COLUMNS.map((col) => (
              <Column
                key={col.status}
                title={col.title}
                cards={tasks.filter((task) => task.status === col.status)}
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Main;