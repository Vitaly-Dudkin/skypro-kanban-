// src/contexts/TaskContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import { getTasks, createTask, updateTask, deleteTask } from '../services/api';

export const TaskContext = createContext(null);

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadTasks = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getTasks();
      // ✅ Нормализация: если приходит _id, копируем в id для удобства
      const normalizedTasks = (data.tasks || []).map(task => ({
        ...task,
        id: task.id || task._id, // fallback для совместимости
      }));
      setTasks(normalizedTasks);
    } catch (err) {
      setError(err.message || 'Не удалось загрузить задачи');
      console.error('Ошибка загрузки задач:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

 const addTask = async (taskData) => {
  setError(null);
  try {
    const response = await createTask(taskData); // response = { tasks: [...], id: undefined }
    
    // 🟢 Получаем актуальный список задач из ответа
    const updatedTasks = response.tasks || [];
    
    // 🟢 Нормализуем каждую задачу
    const normalizedTasks = updatedTasks.map(task => ({
      ...task,
      id: task.id || task._id,
    }));
    
    // 🟢 Заменяем весь список — это надёжнее, чем пушить
    setTasks(normalizedTasks);
    
    // 🟢 Возвращаем последнюю задачу (предполагаем, что она новая)
    return normalizedTasks[normalizedTasks.length - 1];
  } catch (err) {
    setError(err.message || 'Не удалось создать задачу');
    throw err;
  }
};

const editTask = async (id, updates) => {
  setError(null);
  try {
    const response = await updateTask(id, updates);
    const normalizedTasks = (response.tasks || []).map(task => ({
      ...task,
      id: task.id || task._id,
    }));
    setTasks(normalizedTasks);
    return normalizedTasks.find(t => t._id === id || t.id === id);
  } catch (err) {
    setError(err.message || 'Не удалось обновить задачу');
    throw err;
  }
};

const removeTask = async (id) => {
  setError(null);
  try {
    const response = await deleteTask(id);
    const normalizedTasks = (response.tasks || []).map(task => ({
      ...task,
      id: task.id || task._id,
    }));
    setTasks(normalizedTasks);
  } catch (err) {
    setError(err.message || 'Не удалось удалить задачу');
    throw err;
  }
};
  return (
    <TaskContext.Provider
      value={{
        tasks,
        loading,
        error,
        addTask,
        editTask,
        removeTask,
        reload: loadTasks,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export const useTasks = () => useContext(TaskContext);