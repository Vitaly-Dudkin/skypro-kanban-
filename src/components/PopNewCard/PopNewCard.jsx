// src/components/PopNewCard/PopNewCard.jsx
import React, { useState, useEffect } from 'react';
import { useTasks } from '../../contexts/TaskContext';

function PopNewCard({ isOpen, onClose }) {
  const { addTask } = useTasks();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [topic, setTopic] = useState('Web Design');
  const [status, setStatus] = useState('Нужно сделать');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [hoveredDate, setHoveredDate] = useState(null);

  const today = new Date();

  // ✅ Единственный useEffect — сбрасывает поля при открытии
  useEffect(() => {
    if (isOpen) {
      setTitle('');
      setDescription('');
      setTopic('Web Design');
      setStatus('Нужно сделать');
      setSelectedDate(new Date());
    }
  }, [isOpen]);

  // ✅ Ранний return — ТОЛЬКО после всех хуков
  if (!isOpen) return null;

  // Генерация ячеек календаря
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

    // Дни следующего месяца (заполняем до 42 ячеек — 6 недель)
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
    console.log('✅ handleSubmit вызван!');
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
      await addTask(newTask);

onClose();

    } catch (err) {
      alert(err.message || 'Ошибка создания задачи');
    }
  };

  return (
    <div className="pop-new-card" style={{ display: 'block' }}>
      <div className="pop-new-card__container">
        <div className="pop-new-card__block">
          <div className="pop-new-card__content">
            <h3 className="pop-new-card__ttl">Создание задачи</h3>
            <button className="pop-new-card__close" onClick={onClose}>
              &times;
            </button>

            <form onSubmit={handleSubmit}>
              {/* 1. Название */}
              <div className="form-new__block">
                <input
                  className="form-new__input"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Введите название задачи..."
                  required
                  autoFocus
                />
              </div>

              {/* 2. Статусы */}
              <div className="pop-new-card__status status">
                <p className="status__p subttl">Статус</p>
                <div className="status__themes">
                  {['Без статуса', 'Нужно сделать', 'В работе', 'Тестирование', 'Готово'].map(
                    (statusOption) => (
                      <div
                        key={statusOption}
                        className={`status__theme ${status === statusOption ? '_gray' : ''}`}
                        onClick={() => setStatus(statusOption)}
                      >
                        <p className={status === statusOption ? '_gray' : ''}>{statusOption}</p>
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* 3. Описание + календарь */}
              <div className="pop-new-card__wrap">
                <div className="pop-new-card__form form-new">
                  <div className="form-new__block">
                    <label htmlFor="textArea" className="subttl">
                      Описание задачи
                    </label>
                    <textarea
                      className="form-new__area"
                      id="textArea"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Введите описание задачи..."
                    />
                  </div>
                </div>

                <div className="pop-new-card__calendar calendar">
                  <p className="calendar__ttl subttl">Даты</p>
                  <div className="calendar__block">
                    <div className="calendar__nav">
                      <div className="calendar__month">
                        {selectedDate.toLocaleString('ru-RU', { month: 'long', year: 'numeric' })}
                      </div>
                      <div className="nav__actions">
                        <div
                          className="nav__action"
                          onClick={() => {
                            const prevMonth = new Date(selectedDate);
                            prevMonth.setMonth(selectedDate.getMonth() - 1);
                            setSelectedDate(prevMonth);
                          }}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="6" height="11" viewBox="0 0 6 11">
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
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="6" height="11" viewBox="0 0 6 11">
                            <path d="M0.27055 9.04727C-0.0901833 9.37959 -0.0901832 9.9167 0.27055 10.249C0.633779 10.5837 1.2246 10.5837 1.58783 10.249L5.47151 6.67117C6.17616 6.02201 6.17616 4.97799 5.47151 4.32883L1.58782 0.75097C1.2246 0.416344 0.633778 0.416344 0.270549 0.75097C-0.0901831 1.0833 -0.090184 1.62041 0.270549 1.95273L4.12103 5.5L0.27055 9.04727Z" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    <div className="calendar__content">
                      <div className="calendar__days-names">
                        <div className="calendar__day-name">пн</div>
                        <div className="calendar__day-name">вт</div>
                        <div className="calendar__day-name">ср</div>
                        <div className="calendar__day-name">чт</div>
                        <div className="calendar__day-name">пт</div>
                        <div className="calendar__day-name -weekend-">сб</div>
                        <div className="calendar__day-name -weekend-">вс</div>
                      </div>
                      <div className="calendar__cells">{renderCalendarCells()}</div>
                    </div>

                    <div className="calendar__period">
                      <p className="calendar__p date-end">
                        Срок исполнения: <span className="date-control">{selectedDate.toLocaleDateString('ru-RU')}</span>.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 4. Категории */}
              <div className="pop-new-card__categories categories">
                <p className="categories__p subttl">Категория</p>
                <div className="categories__themes">
                  {['Web Design', 'Research', 'Copywriting'].map((cat) => (
                    <div
                      key={cat}
                      className={`categories__theme ${topic === cat ? '_orange _active-category' : '_green'}`}
                      onClick={() => setTopic(cat)}
                    >
                      <p className={topic === cat ? '_orange' : '_green'}>{cat}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 5. Кнопка */}
              <button type="submit" className="form-new__create _hover01">
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