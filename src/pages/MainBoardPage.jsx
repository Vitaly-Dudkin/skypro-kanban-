// src/pages/MainBoardPage.jsx

import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { getTasks } from '../services/api'; // ← импортируем API
import Main from '../components/Main/Main';
import Header from '../components/Header/Header';
import PopExit from '../components/PopExit/PopExit';
import PopNewCard from '../components/PopNewCard/PopNewCard';
import PopBrowse from '../components/PopBrowse/PopBrowse';

export default function MainBoard  () {
  const [isPopNewOpen, setIsPopNewOpen] = useState(false);
  const [browseTaskId, setBrowseTaskId] = useState(null);
  const [tasks, setTasks] = useState([]); // ← состояние задач
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const { id } = useParams();

  // Загружаем задачи при монтировании
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await getTasks();
        setTasks(data.tasks || []);
      } catch (error) {
        console.error('Ошибка загрузки задач:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  useEffect(() => {
    if (location.pathname === '/task/new') {
      setIsPopNewOpen(true);
    } else {
      setIsPopNewOpen(false);
    }
  }, [location.pathname]);

  useEffect(() => {
    if (location.pathname.startsWith('/task/') && location.pathname !== '/task/new') {
      setBrowseTaskId(id);
    } else {
      setBrowseTaskId(null);
    }
  }, [location.pathname, id]);

  const closeNewTaskModal = () => setIsPopNewOpen(false);
  const closeBrowseModal = () => setBrowseTaskId(null);

  // Функция для обновления списка задач (будет передаваться в PopNewCard)
  const handleTasksUpdate = (updatedTasks) => {
    setTasks(updatedTasks);
  };

  return (
    <div className="wrapper">
      <PopExit />
      <PopNewCard 
        isOpen={isPopNewOpen} 
        onClose={closeNewTaskModal}
        onTasksUpdate={handleTasksUpdate} // ← передаём обработчик
      />
      <PopBrowse 
        isOpen={!!browseTaskId} 
        taskId={browseTaskId} 
        onClose={closeBrowseModal}
        tasks={tasks}
        onTasksUpdate={handleTasksUpdate} // ← для удаления/редактирования
      />
      <Header onOpenPopNew={() => setIsPopNewOpen(true)} />
      <Main tasks={tasks} loading={loading} /> {/* ← передаём задачи */}
    </div>
  );
}