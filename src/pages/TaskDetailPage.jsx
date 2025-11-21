// src/pages/TaskDetailPage.jsx
import { useParams } from 'react-router-dom';

export default function TaskDetailPage() {
  const { id } = useParams();
  return (
    <div style={{ padding: '40px', maxWidth: '600px', margin: '0 auto' }}>
      <h2>Задача #{id}</h2>
      <p>Детали задачи</p>
      <a href="/">← Назад</a>
    </div>
  );
}