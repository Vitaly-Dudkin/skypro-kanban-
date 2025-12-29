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
      const newTask = await createTask(taskData);
      // ✅ Нормализуем новую задачу тоже
      const normalized = {
        ...newTask,
        id: newTask.id || newTask._id,
      };
      setTasks(prev => [...prev, normalized]);
      return normalized;
    } catch (err) {
      setError(err.message || 'Не удалось создать задачу');
      throw err;
    }
  };

  const editTask = async (id, updates) => {
    setError(null);
    try {
      const updated = await updateTask(id, updates);
      // ✅ Обновляем по _id или id — универсально
      setTasks(prev =>
        prev.map(task =>
          (task._id === id || task.id === id) ? { ...task, ...updated, id: updated.id || updated._id } : task
        )
      );
      return updated;
    } catch (err) {
      setError(err.message || 'Не удалось обновить задачу');
      throw err;
    }
  };

  const removeTask = async (id) => {
    setError(null);
    try {
      await deleteTask(id);
      setTasks(prev =>
        prev.filter(task => task._id !== id && task.id !== id)
      );
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