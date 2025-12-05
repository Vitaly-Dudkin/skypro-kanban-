// src/AppRoutes.jsx

import { useState, useEffect } from 'react'; // ← ЭТА СТРОКА ОБЯЗАТЕЛЬНА
import { Routes, Route } from 'react-router-dom';
import MainBoardPage from './pages/MainBoardPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import NotFoundPage from './pages/NotFoundPage';
import PrivateRoute from './components/PrivateRoute';

export default function AppRoutes() {
  const [isAuth, setIsAuth] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuth(!!token);
    setAuthChecked(true);
  }, []);

  if (!authChecked) {
    return <div>Проверка сессии...</div>;
  }

  return (
    <Routes>
      <Route element={<PrivateRoute isAuth={isAuth} />}>
        <Route path="/" element={<MainBoardPage />} />
        <Route path="/task/new" element={<MainBoardPage withNewTaskModal={true} />} />
        <Route path="/task/:id" element={<MainBoardPage withBrowseTaskId={true} />} />
      </Route>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}