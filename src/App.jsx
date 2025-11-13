import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/Header/Header';
import PopExit from './components/PopExit/PopExit';
import PopNewCard from './components/PopNewCard/PopNewCard'; 
import PopBrowse from './components/PopBrowse/PopBrowse';
import Main from './components/Main/Main';


function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="wrapper">

      {/* Pop-up: Выйти из аккаунта */}
      <PopExit/>

      {/* Pop-up: Создание задачи */}
      <PopNewCard />

      {/* Pop-up: Просмотр задачи */}
      <PopBrowse />

      {/* Основной контент */}
      <Header/>

       <Main /> 
    </div>
  );
}

export default App
