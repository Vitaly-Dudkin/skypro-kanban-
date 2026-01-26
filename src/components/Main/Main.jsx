// src/components/Main/Main.jsx

import Column from '../Column/Column';
import { useTheme } from '../../contexts/ThemeContext';
import {
  MainWrapper,
  MainContainer,
  MainContent,
  Board,
  LoadingText,
} from './Main.styled';

const COLUMNS = [
  { title: 'Без статуса', status: 'Без статуса' },
  { title: 'Нужно сделать', status: 'Нужно сделать' },
  { title: 'В работе', status: 'В работе' },
  { title: 'Тестирование', status: 'Тестирование' },
  { title: 'Готово', status: 'Готово' },
];

const Main = ({ tasks = [], loading }) => { // ← принимаем задачи
  const { theme } = useTheme();
  if (loading) {
    return (
      <MainWrapper>
        <MainContainer>
          <LoadingText>Загрузка задач...</LoadingText>
        </MainContainer>
      </MainWrapper>
    );
  }

  return (
    <MainWrapper>
      <MainContainer>
        <MainContent>
          <Board>
            {COLUMNS.map((col) => (
              <Column
                key={col.status}
                title={col.title}
                cards={tasks.filter((task) => task.status === col.status)}
              />
            ))}
          </Board>
        </MainContent>
      </MainContainer>
    </MainWrapper>
  );
};

export default Main;