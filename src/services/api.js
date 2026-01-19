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

// Обработка ошибок: 401 — тихий сброс, остальные — проброс с сообщением
kanbanApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return Promise.reject(error); // пробрасываем ошибку "как есть"
    }

  
    const message = error.response?.data?.message || 'Ошибка API';
    return Promise.reject(new Error(message));
  }
);

export const getTasks = () => kanbanApi.get('/kanban').then(res => res.data);

export const getTaskById = (id) => kanbanApi.get(`/kanban/${id}`).then(res => res.data);

export const createTask = (taskData) => kanbanApi.post('/kanban', taskData).then(res => res.data);

export const updateTask = (id, taskData) => kanbanApi.put(`/kanban/${id}`, taskData).then(res => res.data);

export const deleteTask = (id) => kanbanApi.delete(`/kanban/${id}`).then(res => res.data);