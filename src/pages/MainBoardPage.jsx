// src/pages/MainBoardPage.jsx

import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Main from '../components/Main/Main';
import Header from '../components/Header/Header';
import PopExit from '../components/PopExit/PopExit';
import PopNewCard from '../components/PopNewCard/PopNewCard';
import PopBrowse from '../components/PopBrowse/PopBrowse';

export default function MainBoardPage() {
  const [isPopNewOpen, setIsPopNewOpen] = useState(false);
  const [browseTaskId, setBrowseTaskId] = useState(null);
  const location = useLocation();
  const { id } = useParams();

  // Открываем модалку создания задачи
  useEffect(() => {
    if (location.pathname === '/task/new') {
      setIsPopNewOpen(true);
    } else {
      setIsPopNewOpen(false);
    }
  }, [location.pathname]);

  // Открываем модалку просмотра задачи
  useEffect(() => {
    if (location.pathname.startsWith('/task/') && location.pathname !== '/task/new') {
      setBrowseTaskId(id);
    } else {
      setBrowseTaskId(null);
    }
  }, [location.pathname, id]);

  const closeNewTaskModal = () => {
    setIsPopNewOpen(false);
  };

  const closeBrowseModal = () => {
    setBrowseTaskId(null);
  };

  return (
    <div className="wrapper">
      <PopExit />
      <PopNewCard isOpen={isPopNewOpen} onClose={closeNewTaskModal} />
      <PopBrowse isOpen={!!browseTaskId} taskId={browseTaskId} onClose={closeBrowseModal} />
      <Header 
        onOpenPopNew={() => setIsPopNewOpen(true)} 
      />
      <Main />
    </div>
  );
}