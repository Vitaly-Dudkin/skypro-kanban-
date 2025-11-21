// src/pages/MainBoardPage.jsx

import React from 'react';
import Main from '../components/Main/Main';
import Header from '../components/Header/Header';
// ✅ Добавь импорты модальных окон
import PopExit from '../components/PopExit/PopExit';
import PopNewCard from '../components/PopNewCard/PopNewCard';
import PopBrowse from '../components/PopBrowse/PopBrowse';

export default function MainBoardPage() {
  return (
    <div className="wrapper">
      <PopExit />
      <PopNewCard />
      <PopBrowse />
      <Header />
      <Main />
    </div>
  );
}