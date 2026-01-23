// src/contexts/ThemeContext.jsx
import { createContext, useContext, useEffect, useState } from 'react';
import { ThemeProvider as StyledComponentsThemeProvider } from 'styled-components';

const ThemeContext = createContext();

export const lightTheme = {
  name: 'light',
  background: '#ffffff',      // фон всего приложения
  surface: '#eaeef6',        // фон доски (MainWrapper)
  card: '#ffffff',           // фон карточек
  text: '#000000',
  textSecondary: '#94A6BE',
  border: 'rgba(148, 166, 190, 0.4)',
  primary: '#565EEF',
  primaryHover: '#33399b',
  status: {
    gray: '#94A6BE',
    orange: '#FF6D00',
    green: '#06B16E',
    purple: '#9A48F1',
  },
  calendar: {
    otherMonth: 'transparent',
    cellDay: '#94A6BE',
    cellBg: '#EAEEF6',
    activeDay: '#dfe3e8',
  },
};

export const darkTheme = {
  name: 'dark',
  background: '#121212',     // фон всего приложения
  surface: '#1e1e1e',        // фон доски
  card: '#20202C',           // ← ТОЧНО КАК ТЫ ПРОСИЛ
  text: '#ffffff',           // ← белый текст по умолчанию
  textSecondary: '#adb5bd',
  border: 'rgba(255, 255, 255, 0.1)',
  primary: '#7a8bff',
  primaryHover: '#565EEF',
  status: {
    gray: '#6c757d',
    orange: '#FFA726',
    green: '#66BB6A',
    purple: '#AB47BC',
  },
  calendar: {
    otherMonth: 'transparent',
    cellDay: '#adb5bd',
    cellBg: '#343a40',
    activeDay: '#495057',
  },
};

export function ThemeProvider({ children }) {
  const getInitialTheme = () => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };

  const [themeName, setThemeName] = useState(getInitialTheme);
  const theme = themeName === 'dark' ? darkTheme : lightTheme;

  useEffect(() => {
    // Сохраняем в localStorage
    localStorage.setItem('theme', themeName);

    // Обновляем ВСЕ CSS-переменные
 const vars = {
  '--bg-app': theme.background,
  '--bg-board': theme.surface,
  '--bg-card': theme.card,
  '--text-color': theme.text,
  '--text-secondary': theme.textSecondary,
  '--border-color': theme.border,
  '--primary-color': theme.primary,
  '--primary-hover': theme.primaryHover, // ← ДОБАВЬ ЭТУ СТРОКУ
  '--status-gray': theme.status.gray,
  '--status-orange': theme.status.orange,
  '--status-green': theme.status.green,
  '--status-purple': theme.status.purple,
  '--calendar-cell-bg': theme.calendar.cellBg,
  '--calendar-active-day': theme.calendar.activeDay,
};

    Object.entries(vars).forEach(([key, value]) => {
      document.documentElement.style.setProperty(key, value);
    });
  }, [themeName, theme]);

  const toggleTheme = () => {
    setThemeName(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme: themeName, toggleTheme }}>
      <StyledComponentsThemeProvider theme={theme}>
        {children}
      </StyledComponentsThemeProvider>
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);