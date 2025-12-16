// src/components/PopBrowse/PopBrowse.jsx

import React, { useState, useEffect } from 'react';
import { getTaskById, updateTask, deleteTask } from '../../services/api';

function PopBrowse({ isOpen, onClose, taskId, onTasksUpdate }) {
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    topic: '',
    status: '',
  });

  // Загрузка задачи при открытии
  useEffect(() => {
    if (!isOpen || !taskId) return;

    const fetchTask = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await getTaskById(taskId);
        const taskData = response.task;
        setTask(taskData);
        setFormData({
          title: taskData.title,
          description: taskData.description || '',
          topic: taskData.topic,
          status: taskData.status,
        });
      } catch (err) {
        setError(err.message || 'Не удалось загрузить задачу');
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [isOpen, taskId]);

  const handleDelete = async () => {
    if (!window.confirm('Вы уверены, что хотите удалить задачу?')) return;

    try {
      const response = await deleteTask(taskId);
      onTasksUpdate(response.tasks);
      onClose();
    } catch (err) {
      setError(err.message || 'Не удалось удалить задачу');
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    if (task) {
      setFormData({
        title: task.title,
        description: task.description || '',
        topic: task.topic,
        status: task.status,
      });
    }
  };

  const handleSave = async () => {
    try {
      const updatedTask = {
        title: formData.title,
        description: formData.description,
        topic: formData.topic,
        status: formData.status,
        date: task.date, // сохраняем исходную дату
      };

      const response = await updateTask(taskId, updatedTask);
      onTasksUpdate(response.tasks);
      setTask(response.tasks.find(t => t._id === taskId));
      setIsEditing(false);
    } catch (err) {
      setError(err.message || 'Не удалось сохранить изменения');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (!isOpen) return null;

  return (
    <div className="pop-browse" style={{ display: 'block' }}>
      <div className="pop-browse__container">
        <div className="pop-browse__block">
          <div className="pop-browse__content">
            {loading ? (
              <p>Загрузка...</p>
            ) : error ? (
              <p style={{ color: 'red' }}>{error}</p>
            ) : task ? (
              <>
                {/* Заголовок и тема */}
                <div className="pop-browse__top-block">
                  {isEditing ? (
                    <input
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      className="form-new__input"
                      style={{ width: '100%', marginBottom: '10px' }}
                    />
                  ) : (
                    <h3 className="pop-browse__ttl">{task.title}</h3>
                  )}
                  <div className="categories__theme theme-top _orange _active-category">
                    <p className="_orange">{task.topic}</p>
                  </div>
                </div>

                {/* Статус */}
                <div className="pop-browse__status status">
                  <p className="status__p subttl">Статус</p>
                  {isEditing ? (
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                      style={{ padding: '5px', marginTop: '5px' }}
                    >
                      <option value="Без статуса">Без статуса</option>
                      <option value="Нужно сделать">Нужно сделать</option>
                      <option value="В работе">В работе</option>
                      <option value="Тестирование">Тестирование</option>
                      <option value="Готово">Готово</option>
                    </select>
                  ) : (
                    <div className="status__themes">
                      <div className={`status__theme ${task.status === 'Нужно сделать' ? '_gray' : '_hide'}`}>
                        <p className="_gray">Нужно сделать</p>
                      </div>
                      <div className={`status__theme ${task.status === 'В работе' ? '_gray' : '_hide'}`}>
                        <p className="_gray">В работе</p>
                      </div>
                      <div className={`status__theme ${task.status === 'Тестирование' ? '_gray' : '_hide'}`}>
                        <p className="_gray">Тестирование</p>
                      </div>
                      <div className={`status__theme ${task.status === 'Готово' ? '_gray' : '_hide'}`}>
                        <p className="_gray">Готово</p>
                      </div>
                      <div className={`status__theme ${task.status === 'Без статуса' ? '_gray' : '_hide'}`}>
                        <p className="_gray">Без статуса</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Описание */}
                <div className="pop-browse__wrap">
                  <div className="pop-browse__form form-browse">
                    <div className="form-browse__block">
                      <label htmlFor="textArea01" className="subttl">
                        Описание задачи
                      </label>
                      {isEditing ? (
                        <textarea
                          name="description"
                          value={formData.description}
                          onChange={handleChange}
                          className="form-browse__area"
                          style={{ height: '100px' }}
                        />
                      ) : (
                        <textarea
                          className="form-browse__area"
                          readOnly
                          value={task.description || 'Без описания'}
                        />
                      )}
                    </div>
                  </div>
                </div>

                {/* Категория */}
                <div className="theme-down__categories theme-down">
                  <p className="categories__p subttl">Категория</p>
                  <div className="categories__theme _orange _active-category">
                    <p className="_orange">{task.topic}</p>
                  </div>
                </div>

                {/* Кнопки */}
                {isEditing ? (
                  <div className="pop-browse__btn-edit">
                    <div className="btn-group">
                      <button className="btn-edit__edit _btn-bg _hover01" onClick={handleSave}>
                        Сохранить
                      </button>
                      <button className="btn-edit__edit _btn-bor _hover03" onClick={handleCancelEdit}>
                        Отменить
                      </button>
                      <button className="btn-edit__delete _btn-bor _hover03" onClick={handleDelete}>
                        Удалить задачу
                      </button>
                    </div>
                    <button
                      className="btn-edit__close _btn-bg _hover01"
                      onClick={handleCancelEdit}
                    >
                      Закрыть
                    </button>
                  </div>
                ) : (
                  <div className="pop-browse__btn-browse">
                    <div className="btn-group">
                      <button className="btn-browse__edit _btn-bor _hover03" onClick={handleEdit}>
                        Редактировать задачу
                      </button>
                      <button className="btn-browse__delete _btn-bor _hover03" onClick={handleDelete}>
                        Удалить задачу
                      </button>
                    </div>
                    <button
                      className="btn-browse__close _btn-bg _hover01"
                      onClick={onClose}
                    >
                      Закрыть
                    </button>
                  </div>
                )}
              </>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PopBrowse;