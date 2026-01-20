// src/pages/MainBoardPage.jsx
import { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
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
  const [browseTaskId, setBrowseTaskId] = useState(null);
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

  // Синхронизация модалки просмотра задачи
  useEffect(() => {
    if (location.pathname.startsWith('/task/') && location.pathname !== '/task/new') {
      setBrowseTaskId(id || null);
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
        isOpen={!!browseTaskId} 
        taskId={browseTaskId} 
        onClose={closeBrowseModal} 
      />
      
      <Header 
        user={user}
        onOpenPopNew={() => setIsPopNewOpen(true)} 
      />
      
      <Main tasks={tasks} loading={loading} />

      {/* Фиксированная кнопка "Создать задачу" на мобилке */}
      <button
        onClick={() => setIsPopNewOpen(true)}
        style={{
          display: 'none',
          position: 'fixed',
          bottom: '20px',
          left: '16px',
          width: '343px',
          height: '40px',
          borderRadius: '4px',
          backgroundColor: 'var(--primary-color)',
          color: 'white',
          border: 'none',
          fontSize: '14px',
          fontWeight: '500',
          padding: '10px 14px',
          cursor: 'pointer',
          zIndex: 1000,
        }}
        className="mobile-create-btn"
      >
        Создать новую задачу
      </button>
    </div>
  );
}