// src/AppRoutes.jsx

import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import MainBoardPage from './pages/MainBoardPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import BrowseTaskPage from './pages/BrowseTaskPage';
import ExitPage from './pages/ExitPage';
import NotFoundPage from './pages/NotFoundPage';
import PrivateRoute from './components/PrivateRoute';

export default function AppRoutes() {
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedAuth = localStorage.getItem('isAuth') === 'true';
    setIsAuth(savedAuth);
    setLoading(false);
  }, []);

  return (
    <Routes>
      <Route element={<PrivateRoute isAuth={isAuth} />}>
        <Route path="/" element={<MainBoardPage />} />
        <Route
          path="/task/new"
          element={<MainBoardPage withNewTaskModal={true} />}
        />
        <Route path="/task/:id" element={<MainBoardPage withBrowseTaskId={true} />} />
        <Route path="/exit" element={<ExitPage />} />
      </Route>
      <Route path="/login" element={<LoginPage setIsAuth={setIsAuth} />} />
      <Route path="/register" element={<RegisterPage setIsAuth={setIsAuth} />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}