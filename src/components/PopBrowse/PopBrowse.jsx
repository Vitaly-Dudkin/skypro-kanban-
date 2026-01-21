// src/components/PopBrowse/PopBrowse.jsx
import React, { useState, useEffect } from 'react';
import { useTasks } from '../../contexts/TaskContext';
import { useNavigate } from 'react-router-dom';

function PopBrowse({ isOpen, onClose, taskId }) {
  const { tasks, editTask, removeTask } = useTasks();
  const navigate = useNavigate();

  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    topic: '',
    status: '',
  });

  useEffect(() => {
    if (!isOpen || !taskId) {
      setLoading(false);
      return;
    }

    const found = tasks.find(t => String(t._id) === String(taskId));
    if (found) {
      setTask(found);
      setFormData({
        title: found.title,
        description: found.description || '',
        topic: found.topic,
        status: found.status,
      });
      setError('');
    } else {
      setError('Задача не найдена');
    }
    setLoading(false);
  }, [isOpen, taskId, tasks]);

  const handleDelete = async () => {
    try {
      await removeTask(taskId);
      onClose();
      navigate('/'); // ← редирект на главную
    } catch (err) {
      setError(err.message || 'Не удалось удалить задачу');
    } finally {
      setShowDeleteConfirm(false);
    }
  };

  const openDeleteConfirm = () => setShowDeleteConfirm(true);
  const closeDeleteConfirm = () => setShowDeleteConfirm(false);

  const handleEdit = () => setIsEditing(true);

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
      await editTask(taskId, {
        title: formData.title,
        description: formData.description,
        topic: formData.topic,
        status: formData.status,
        date: task.date,
      });
      setIsEditing(false);
    } catch (err) {
      setError(err.message || 'Не удалось сохранить изменения');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
                      {['Без статуса', 'Нужно сделать', 'В работе', 'Тестирование', 'Готово'].map(status => (
                        <div
                          key={status}
                          className={`status__theme ${task.status === status ? '_gray' : '_hide'}`}
                        >
                          <p className="_gray">{status}</p>
                        </div>
                      ))}
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
                      <button
                        className="btn-edit__edit _btn-bg _hover01"
                        onClick={handleSave}
                      >
                        Сохранить
                      </button>
                      <button
                        className="btn-edit__edit _btn-bor _hover03"
                        onClick={handleCancelEdit}
                      >
                        Отменить
                      </button>
                      <button
                        className="btn-edit__delete _btn-bor _hover03"
                        onClick={openDeleteConfirm} // ← ВОТ ЭТО ИЗМЕНЕНИЕ
                      >
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
                      <button
                        className="btn-browse__edit _btn-bor _hover03"
                        onClick={handleEdit}
                      >
                        Редактировать задачу
                      </button>
                      <button
                        className="btn-browse__delete _btn-bor _hover03"
                        onClick={openDeleteConfirm} // ← И ЭТО
                      >
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

      {/* Модалка подтверждения удаления */}
      {showDeleteConfirm && (
        <div
          className="pop-exit"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0,0,0,0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1001,
          }}
          onClick={closeDeleteConfirm}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: 'var(--bg-card)',
              color: 'var(--text-color)',
              padding: '50px 60px',
              borderRadius: '10px',
              maxWidth: '370px',
              width: '90%',
              textAlign: 'center',
            }}
          >
            <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '20px' }}>
              Вы уверены, что хотите удалить задачу?
            </h2>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
              <button
                onClick={handleDelete}
                style={{
                  width: '153px',
                  height: '30px',
                  background: 'var(--primary-color)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                Да, удалить
              </button>
              <button
                onClick={closeDeleteConfirm}
                style={{
                  width: '153px',
                  height: '30px',
                  background: 'transparent',
                  color: 'var(--primary-color)',
                  border: '0.7px solid var(--primary-color)',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                Нет, отмена
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PopBrowse;ы