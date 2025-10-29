import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/Header/Header';
import PopExit from './components/PopExit/PopExit';
import PopNewCard from './components/PopNewCard/PopNewCard'; 
import PopBrowse from './components/PopBrowse/PopBrowse'; 


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

      <main className="main">
        <div className="container">
          <div className="main__block">
            <div className="main__content">
              {/* Колонка: Без статуса */}
              <div className="main__column column">
                <div className="column__title">
                  <p>Без статуса</p>
                </div>
                <div className="cards">
                  {/* 5 карточек */}
                  {[...Array(5)].map((_, i) => (
                    <div className="cards__item" key={i}>
                      <div className="cards__card card">
                        <div className="card__group">
                          <div
                            className={`card__theme ${
                              i === 1 || i === 5 ? '_green' : i === 3 ? '_purple' : '_orange'
                            }`}
                          >
                            <p
                              className={
                                i === 1 || i === 5
                                  ? '_green'
                                  : i === 3
                                  ? '_purple'
                                  : '_orange'
                              }
                            >
                              {i === 1 || i === 5
                                ? 'Research'
                                : i === 3
                                ? 'Copywriting'
                                : 'Web Design'}
                            </p>
                          </div>
                          <a href="#popBrowse" target="_self">
                            <div className="card__btn">
                              <div></div>
                              <div></div>
                              <div></div>
                            </div>
                          </a>
                        </div>
                        <div className="card__content">
                          <a href="" target="_blank">
                            <h3 className="card__title">Название задачи</h3>
                          </a>
                          <div className="card__date">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="13"
                              height="13"
                              viewBox="0 0 13 13"
                              fill="none"
                            >
                              <g clipPath="url(#clip0_1_415)">
                                <path
                                  d="M10.5625 2.03125H2.4375C1.7644 2.03125 1.21875 2.5769 1.21875 3.25V10.5625C1.21875 11.2356 1.7644 11.7812 2.4375 11.7812H10.5625C11.2356 11.7812 11.7812 11.2356 11.7812 10.5625V3.25C11.7812 2.5769 11.2356 2.03125 10.5625 2.03125Z"
                                  stroke="#94A6BE"
                                  strokeWidth="0.8"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M11.7812 4.0625H1.21875M3.25 1.21875V2.03125V1.21875ZM9.75 1.21875V2.03125V1.21875Z"
                                  stroke="#94A6BE"
                                  strokeWidth="0.8"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </g>
                              <defs>
                                <clipPath id="clip0_1_415">
                                  <rect width="13" height="13" fill="white" />
                                </clipPath>
                              </defs>
                            </svg>
                            <p>30.10.23</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Колонка: Нужно сделать */}
              <div className="main__column">
                <div className="column__title">
                  <p>Нужно сделать</p>
                </div>
                <div className="cards">
                  <div className="cards__item">
                    <div className="cards__card card">
                      <div className="card__group">
                        <div className="card__theme _green">
                          <p className="_green">Research</p>
                        </div>
                        <a href="#popBrowse" target="_self">
                          <div className="card__btn">
                            <div></div>
                            <div></div>
                            <div></div>
                          </div>
                        </a>
                      </div>
                      <div className="card__content">
                        <a href="" target="_blank">
                          <h3 className="card__title">Название задачи</h3>
                        </a>
                        <div className="card__date">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="13"
                            height="13"
                            viewBox="0 0 13 13"
                            fill="none"
                          >
                            <g clipPath="url(#clip0_1_415)">
                              <path
                                d="M10.5625 2.03125H2.4375C1.7644 2.03125 1.21875 2.5769 1.21875 3.25V10.5625C1.21875 11.2356 1.7644 11.7812 2.4375 11.7812H10.5625C11.2356 11.7812 11.7812 11.2356 11.7812 10.5625V3.25C11.7812 2.5769 11.2356 2.03125 10.5625 2.03125Z"
                                stroke="#94A6BE"
                                strokeWidth="0.8"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M11.7812 4.0625H1.21875M3.25 1.21875V2.03125V1.21875ZM9.75 1.21875V2.03125V1.21875Z"
                                stroke="#94A6BE"
                                strokeWidth="0.8"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_1_415">
                                <rect width="13" height="13" fill="white" />
                              </clipPath>
                            </defs>
                          </svg>
                          <p>30.10.23</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Колонка: В работе */}
              <div className="main__column">
                <div className="column__title">
                  <p>В работе</p>
                </div>
                <div className="cards">
                  {[...Array(3)].map((_, i) => (
                    <div className="cards__item" key={i + 10}>
                      <div className="cards__card card">
                        <div className="card__group">
                          <div
                            className={`card__theme ${
                              i === 0 ? '_green' : i === 1 ? '_purple' : '_orange'
                            }`}
                          >
                            <p
                              className={
                                i === 0 ? '_green' : i === 1 ? '_purple' : '_orange'
                              }
                            >
                              {i === 0
                                ? 'Research'
                                : i === 1
                                ? 'Copywriting'
                                : 'Web Design'}
                            </p>
                          </div>
                          <a href="#popBrowse" target="_self">
                            <div className="card__btn">
                              <div></div>
                              <div></div>
                              <div></div>
                            </div>
                          </a>
                        </div>
                        <div className="card__content">
                          <a href="" target="_blank">
                            <h3 className="card__title">Название задачи</h3>
                          </a>
                          <div className="card__date">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="13"
                              height="13"
                              viewBox="0 0 13 13"
                              fill="none"
                            >
                              <g clipPath="url(#clip0_1_415)">
                                <path
                                  d="M10.5625 2.03125H2.4375C1.7644 2.03125 1.21875 2.5769 1.21875 3.25V10.5625C1.21875 11.2356 1.7644 11.7812 2.4375 11.7812H10.5625C11.2356 11.7812 11.7812 11.2356 11.7812 10.5625V3.25C11.7812 2.5769 11.2356 2.03125 10.5625 2.03125Z"
                                  stroke="#94A6BE"
                                  strokeWidth="0.8"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M11.7812 4.0625H1.21875M3.25 1.21875V2.03125V1.21875ZM9.75 1.21875V2.03125V1.21875Z"
                                  stroke="#94A6BE"
                                  strokeWidth="0.8"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </g>
                              <defs>
                                <clipPath id="clip0_1_415">
                                  <rect width="13" height="13" fill="white" />
                                </clipPath>
                              </defs>
                            </svg>
                            <p>30.10.23</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Тестирование */}
              <div className="main__column">
                <div className="column__title">
                  <p>Тестирование</p>
                </div>
                <div className="cards">
                  <div className="cards__item">
                    <div className="cards__card card">
                      <div className="card__group">
                        <div className="card__theme _green">
                          <p className="_green">Research</p>
                        </div>
                        <a href="#popBrowse" target="_self">
                          <div className="card__btn">
                            <div></div>
                            <div></div>
                            <div></div>
                          </div>
                        </a>
                      </div>
                      <div className="card__content">
                        <a href="" target="_blank">
                          <h3 className="card__title">Название задачи</h3>
                        </a>
                        <div className="card__date">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="13"
                            height="13"
                            viewBox="0 0 13 13"
                            fill="none"
                          >
                            <g clipPath="url(#clip0_1_415)">
                              <path
                                d="M10.5625 2.03125H2.4375C1.7644 2.03125 1.21875 2.5769 1.21875 3.25V10.5625C1.21875 11.2356 1.7644 11.7812 2.4375 11.7812H10.5625C11.2356 11.7812 11.7812 11.2356 11.7812 10.5625V3.25C11.7812 2.5769 11.2356 2.03125 10.5625 2.03125Z"
                                stroke="#94A6BE"
                                strokeWidth="0.8"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M11.7812 4.0625H1.21875M3.25 1.21875V2.03125V1.21875ZM9.75 1.21875V2.03125V1.21875Z"
                                stroke="#94A6BE"
                                strokeWidth="0.8"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_1_415">
                                <rect width="13" height="13" fill="white" />
                              </clipPath>
                            </defs>
                          </svg>
                          <p>30.10.23</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Готово */}
              <div className="main__column">
                <div className="column__title">
                  <p>Готово</p>
                </div>
                <div className="cards">
                  <div className="cards__item">
                    <div className="cards__card card">
                      <div className="card__group">
                        <div className="card__theme _green">
                          <p className="_green">Research</p>
                        </div>
                        <a href="#popBrowse" target="_self">
                          <div className="card__btn">
                            <div></div>
                            <div></div>
                            <div></div>
                          </div>
                        </a>
                      </div>
                      <div className="card__content">
                        <a href="" target="_blank">
                          <h3 className="card__title">Название задачи</h3>
                        </a>
                        <div className="card__date">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="13"
                            height="13"
                            viewBox="0 0 13 13"
                            fill="none"
                          >
                            <g clipPath="url(#clip0_1_415)">
                              <path
                                d="M10.5625 2.03125H2.4375C1.7644 2.03125 1.21875 2.5769 1.21875 3.25V10.5625C1.21875 11.2356 1.7644 11.7812 2.4375 11.7812H10.5625C11.2356 11.7812 11.7812 11.2356 11.7812 10.5625V3.25C11.7812 2.5769 11.2356 2.03125 10.5625 2.03125Z"
                                stroke="#94A6BE"
                                strokeWidth="0.8"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M11.7812 4.0625H1.21875M3.25 1.21875V2.03125V1.21875ZM9.75 1.21875V2.03125V1.21875Z"
                                stroke="#94A6BE"
                                strokeWidth="0.8"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_1_415">
                                <rect width="13" height="13" fill="white" />
                              </clipPath>
                            </defs>
                          </svg>
                          <p>30.10.23</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App
