// src/contexts/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import { login as apiLogin, register as apiRegister } from '../services/auth';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // для splash-экрана

  // Проверка сессии при старте
  useEffect(() => {
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    if (token && savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch {
        // некорректные данные → очищаем
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    const data = await apiLogin(credentials);
    localStorage.setItem('token', data.user.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    setUser(data.user);
  };

  const register = async (userData) => {
    const data = await apiRegister(userData);
    localStorage.setItem('token', data.user.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    setUser(data.user);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    // редирект можно сделать здесь или в компоненте
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);