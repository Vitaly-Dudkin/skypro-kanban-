// src/pages/MainBoardPage.jsx
import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useTasks } from '../contexts/TaskContext';
import { useAuth } from '../contexts/AuthContext';
import Main from '../components/Main/Main';
import Header from '../components/Header/Header';
import PopExit from '../components/PopExit/PopExit';
import PopNewCard from '../components/PopNewCard/PopNewCard';
import PopBrowse from '../components/PopBrowse/PopBrowse';

export default function MainBoard() {
  const { tasks, loading } = useTasks();
  const { user } = useAuth();

  const [isPopNewOpen, setIsPopNewOpen] = useState(false);
  const [browseTaskId, setBrowseTaskId] = useState(null); // ← будет строкой!
  const location = useLocation();
  const { id } = useParams();

  // Синхронизация модалки "Новая задача" с URL
  useEffect(() => {
    if (location.pathname === '/task/new') {
      setIsPopNewOpen(true);
    } else {
      setIsPopNewOpen(false);
    }
  }, [location.pathname]);

  // ✅ ИСПРАВЛЕНО: не Number(id), а id как строка
  useEffect(() => {
    if (location.pathname.startsWith('/task/') && location.pathname !== '/task/new') {
      setBrowseTaskId(id || null); // ← id — строка (например, "6937d1713917f31abbed4c8d")
    } else {
      setBrowseTaskId(null);
    }
  }, [location.pathname, id]);

  const closeNewTaskModal = () => setIsPopNewOpen(false);
  const closeBrowseModal = () => setBrowseTaskId(null);

  return (
    <div className="wrapper">
      <PopExit />
      <PopNewCard 
        isOpen={isPopNewOpen} 
        onClose={closeNewTaskModal}
      />
      <PopBrowse 
        isOpen={!!browseTaskId}   // ← !!'abc' → true, !!null → false
        taskId={browseTaskId}     // ← строка
        onClose={closeBrowseModal}
      />
      <Header 
        user={user}
        onOpenPopNew={() => setIsPopNewOpen(true)} 
      />
      <Main tasks={tasks} loading={loading} />
    </div>
  );
}