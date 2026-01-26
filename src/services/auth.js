// src/services/auth.js

import axios from 'axios';

const BASE_URL = 'https://wedev-api.sky.pro/api';

// Создаём инстанс axios с базовым URL
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': '',
  },
});

export const register = async ({ login, name, password }) => {
  try {
    const response = await api.post('/user', { login, name, password });
    return response.data; // { user: { ..., token: "..." } }
  } catch (error) {
    const message = error.response?.data?.message || 'Ошибка регистрации';
    throw new Error(message);
  }
};

export const login = async ({ login, password }) => {
  try {
    const response = await api.post('/user/login', { login, password });
    return response.data; // { user: { ..., token: "..." } }
  } catch (error) {
    const message = error.response?.data?.message || 'Неверный логин или пароль';
    throw new Error(message);
  }
};