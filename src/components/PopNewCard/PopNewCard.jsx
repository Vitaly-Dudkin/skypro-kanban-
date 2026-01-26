// src/components/PopNewCard/PopNewCard.jsx
import React, { useState, useEffect } from 'react';
import { useTasks } from '../../contexts/TaskContext';
import { useToast } from '../ToastContext';

function PopNewCard({ isOpen, onClose }) {
  const { addTask } = useTasks();
  const { showToast } = useToast();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [topic, setTopic] = useState('Web Design');
  const [status, setStatus] = useState('Нужно сделать');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [hoveredDate, setHoveredDate] = useState(null);

  const today = new Date();

  useEffect(() => {
    if (isOpen) {
      setTitle('');
      setDescription('');
      setTopic('Web Design');
      setStatus('Нужно сделать');
      setSelectedDate(new Date());
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const renderCalendarCells = () => {
    const cells = [];
    const firstDay = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
    const lastDay = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0);
    const startDay = firstDay.getDay() === 0 ? 7 : firstDay.getDay(); // Пн = 1

    // Дни предыдущего месяца
    const prevMonthLastDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 0).getDate();
    for (let i = startDay - 2; i >= 0; i--) {
      const date = prevMonthLastDate - i;
      cells.push(
        <div key={`prev-${date}`} className="calendar__cell _other-month">
          {date}
        </div>
      );
    }

    // Дни текущего месяца
    const totalDays = lastDay.getDate();
    for (let i = 1; i <= totalDays; i++) {
      const dateObj = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), i);
      const isToday = dateObj.toDateString() === today.toDateString();
      const isSelected = dateObj.toDateString() === selectedDate.toDateString();
      const isHovered = hoveredDate && dateObj.toDateString() === hoveredDate.toDateString();

      let cellClass = 'calendar__cell _cell-day';
      if (isToday) cellClass += ' _current';
      if (isSelected) cellClass += ' _active-day';
      if (isHovered) cellClass += ' _cell-day--hover';

      cells.push(
        <div
          key={`curr-${i}`}
          className={cellClass}
          onClick={() => setSelectedDate(dateObj)}
          onMouseEnter={() => setHoveredDate(dateObj)}
          onMouseLeave={() => setHoveredDate(null)}
        >
          {i}
        </div>
      );
    }

    // Дни следующего месяца (до 42 ячеек)
    const remainingCells = 42 - cells.length;
    for (let i = 1; i <= remainingCells; i++) {
      cells.push(
        <div key={`next-${i}`} className="calendar__cell _other-month">
          {i}
        </div>
      );
    }

    return cells;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newTask = {
        title: title || 'Новая задача',
        description: description || '',
        topic,
        status,
        date: selectedDate.toISOString(),
      };
      await addTask(newTask);
      onClose();
    } catch (err) {
      showToast(err.message || 'Ошибка создания задачи', 'error');
    }
  };

  return (
    <div
      className="pop-new-card"
      style={{
        display: 'block',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0,0,0,0.4)',
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <div
        className="pop-new-card__container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          padding: '0 16px',
        }}
      >
        <div
          className="pop-new-card__block"
          style={{
            background: 'var(--bg-card)',
            color: 'var(--text-color)',
            maxWidth: '630px',
            width: '100%',
            padding: '40px 30px 48px',
            borderRadius: '10px',
            border: '1px solid var(--border-color)',
            position: 'relative',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="pop-new-card__content">
            <h3
              className="pop-new-card__ttl"
              style={{ color: 'var(--text-color)', marginBottom: '20px' }}
            >
              Создание задачи
            </h3>
            <button
              className="pop-new-card__close"
              onClick={onClose}
              style={{
                position: 'absolute',
                top: '20px',
                right: '30px',
                color: 'var(--text-secondary)',
                cursor: 'pointer',
                background: 'none',
                border: 'none',
                fontSize: '24px',
              }}
            >
              &times;
            </button>

            <form onSubmit={handleSubmit}>
              {/* Название */}
              <div className="form-new__block" style={{ marginBottom: '20px' }}>
                <input
                  className="form-new__input"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Введите название задачи..."
                  required
                  autoFocus
                  style={{
                    width: '100%',
                    outline: 'none',
                    padding: '14px',
                    background: 'transparent',
                    border: '1px solid var(--border-color)',
                    borderRadius: '8px',
                    color: 'var(--text-color)',
                    fontSize: '14px',
                  }}
                />
              </div>

              {/* Статусы */}
              <div className="pop-new-card__status status" style={{ marginBottom: '20px' }}>
                <p className="status__p subttl" style={{ color: 'var(--text-color)', marginBottom: '14px' }}>
                  Статус
                </p>
                <div className="status__themes" style={{ display: 'flex', flexWrap: 'wrap', gap: '7px' }}>
                  {['Без статуса', 'Нужно сделать', 'В работе', 'Тестирование', 'Готово'].map(
                    (statusOption) => (
                      <div
                        key={statusOption}
                        className={`status__theme ${status === statusOption ? '_gray' : ''}`}
                        onClick={() => setStatus(statusOption)}
                        style={{
                          borderRadius: '24px',
                          border: `1px solid ${status === statusOption ? 'var(--primary-color)' : 'var(--border-color)'}`,
                          color: status === statusOption ? 'var(--text-color)' : 'var(--text-secondary)',
                          padding: '6px 10px',
                          fontSize: '12px',
                          cursor: 'pointer',
                        }}
                      >
                        {statusOption}
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* Описание + календарь */}
              <div className="pop-new-card__wrap" style={{ display: 'flex', gap: '24px', marginBottom: '20px' }}>
                <div className="pop-new-card__form form-new" style={{ flex: 1 }}>
                  <div className="form-new__block">
                    <label
                      htmlFor="textArea"
                      className="subttl"
                      style={{ color: 'var(--text-color)', marginBottom: '14px', display: 'block' }}
                    >
                      Описание задачи
                    </label>
                    <textarea
                      className="form-new__area"
                      id="textArea"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Введите описание задачи..."
                      style={{
                        width: '100%',
                        outline: 'none',
                        padding: '14px',
                        background: 'transparent',
                        border: '1px solid var(--border-color)',
                        borderRadius: '8px',
                        color: 'var(--text-color)',
                        fontSize: '14px',
                        minHeight: '100px',
                        resize: 'vertical',
                      }}
                    />
                  </div>
                </div>

                {/* Календарь */}
                <div className="pop-new-card__calendar calendar" style={{ width: '182px' }}>
                  <p className="calendar__ttl subttl" style={{ color: 'var(--text-color)', marginBottom: '14px' }}>
                    Даты
                  </p>
                  <div className="calendar__block">
                    <div className="calendar__nav" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div className="calendar__month" style={{ color: 'var(--text-secondary)' }}>
                        {selectedDate.toLocaleString('ru-RU', { month: 'long', year: 'numeric' })}
                      </div>
                      <div className="nav__actions" style={{ display: 'flex', gap: '12px' }}>
                        <div
                          className="nav__action"
                          onClick={() => {
                            const prevMonth = new Date(selectedDate);
                            prevMonth.setMonth(selectedDate.getMonth() - 1);
                            setSelectedDate(prevMonth);
                          }}
                          style={{ cursor: 'pointer' }}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="6" height="11" viewBox="0 0 6 11" fill="var(--text-secondary)">
                            <path d="M5.72945 1.95273C6.09018 1.62041 6.09018 1.0833 5.72945 0.750969C5.36622 0.416344 4.7754 0.416344 4.41218 0.750969L0.528487 4.32883C-0.176162 4.97799 -0.176162 6.02201 0.528487 6.67117L4.41217 10.249C4.7754 10.5837 5.36622 10.5837 5.72945 10.249C6.09018 9.9167 6.09018 9.37959 5.72945 9.04727L1.87897 5.5L5.72945 1.95273Z" />
                          </svg>
                        </div>
                        <div
                          className="nav__action"
                          onClick={() => {
                            const nextMonth = new Date(selectedDate);
                            nextMonth.setMonth(selectedDate.getMonth() + 1);
                            setSelectedDate(nextMonth);
                          }}
                          style={{ cursor: 'pointer' }}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="6" height="11" viewBox="0 0 6 11" fill="var(--text-secondary)">
                            <path d="M0.27055 9.04727C-0.0901833 9.37959 -0.0901832 9.9167 0.27055 10.249C0.633779 10.5837 1.2246 10.5837 1.58783 10.249L5.47151 6.67117C6.17616 6.02201 6.17616 4.97799 5.47151 4.32883L1.58782 0.75097C1.2246 0.416344 0.633778 0.416344 0.270549 0.75097C-0.0901831 1.0833 -0.090184 1.62041 0.270549 1.95273L4.12103 5.5L0.27055 9.04727Z" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    <div className="calendar__content">
                      <div className="calendar__days-names" style={{ display: 'flex', justifyContent: 'space-between', padding: '0 7px', marginBottom: '7px' }}>
                        {['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'].map(day => (
                          <div key={day} style={{ color: 'var(--text-secondary)', fontSize: '10px' }}>{day}</div>
                        ))}
                      </div>
                      <div className="calendar__cells" style={{ display: 'flex', flexWrap: 'wrap', width: '182px', height: '126px' }}>
                        {renderCalendarCells()}
                      </div>
                    </div>

                    <div className="calendar__period" style={{ padding: '0 7px', marginTop: '12px' }}>
                      <p className="calendar__p date-end" style={{ color: 'var(--text-secondary)', fontSize: '10px' }}>
                        Срок исполнения: <span style={{ color: 'var(--text-color)' }}>{selectedDate.toLocaleDateString('ru-RU')}</span>.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Категории */}
              <div className="pop-new-card__categories categories" style={{ marginBottom: '20px' }}>
                <p className="categories__p subttl" style={{ color: 'var(--text-color)', marginBottom: '14px' }}>
                  Категория
                </p>
                <div className="categories__themes" style={{ display: 'flex', gap: '7px' }}>
                  {['Web Design', 'Research', 'Copywriting'].map((cat) => (
                    <div
                      key={cat}
                      className={`categories__theme ${topic === cat ? '_orange _active-category' : '_green'}`}
                      onClick={() => setTopic(cat)}
                      style={{
                        display: 'inline-block',
                        padding: '8px 20px',
                        borderRadius: '24px',
                        opacity: topic === cat ? 1 : 0.4,
                        cursor: 'pointer',
                        backgroundColor: topic === cat
                          ? (cat === 'Web Design' ? '#FFE4C2' : cat === 'Research' ? '#B4FDD1' : '#E9D4FF')
                          : 'transparent',
                        color: topic === cat
                          ? (cat === 'Web Design' ? '#FF6D00' : cat === 'Research' ? '#06B16E' : '#9A48F1')
                          : 'var(--text-color)',
                      }}
                    >
                      {cat}
                    </div>
                  ))}
                </div>
              </div>

              {/* Кнопка */}
              <button
                type="submit"
                className="form-new__create _hover01"
                style={{
                  width: '132px',
                  height: '30px',
                  backgroundColor: 'var(--primary-color)',
                  color: 'white',
                  borderRadius: '4px',
                  border: 'none',
                  fontSize: '14px',
                  fontWeight: '500',
                  float: 'right',
                  cursor: 'pointer',
                }}
              >
                Создать задачу
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PopNewCard;