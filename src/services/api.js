// src/services/api.js

import axios from 'axios';

const BASE_URL = 'https://wedev-api.sky.pro/api';

// Инстанс с поддержкой токена
const kanbanApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': '',
  },
});

// Интерцептор для автоматической подстановки токена
kanbanApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Обработка 401 — выход из системы
kanbanApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('isAuth');
      window.location.href = '/login';
    }
    const message = error.response?.data?.message || 'Ошибка API';
    return Promise.reject(new Error(message));
  }
);

// Получить все задачи
export const getTasks = () => kanbanApi.get('/kanban').then(res => res.data);

// Получить задачу по ID
export const getTaskById = (id) => kanbanApi.get(`/kanban/${id}`).then(res => res.data);

// Создать задачу
export const createTask = (taskData) => kanbanApi.post('/kanban', taskData).then(res => res.data);

// Обновить задачу
export const updateTask = (id, taskData) => kanbanApi.put(`/kanban/${id}`, taskData).then(res => res.data);

// Удалить задачу
export const deleteTask = (id) => kanbanApi.delete(`/kanban/${id}`).then(res => res.data);