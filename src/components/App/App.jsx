import React from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Main from '../Main/Main';
import './App.css';
import '../Main/main.css';
import PageNotFound from '../PageNotFound/PageNotFound';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Profile from '../Profile/Profile';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import InfoTooltip from '../InfoTooltip/InfoTooltip'; //всплывающие предупреждения
import Preloader from '../Preloader/Preloader'; //крутилка

import api from '../../utils/api';
import moviesApi from "../../utils/MoviesApi";
import mainApi from "../../utils/MainApi";

import CurrentUserContext from '../../contexts/CurrentUserContext';
import ProtectedRoute from '../../components/ProtectedRoute/ProtectedRoute';
import * as auth from '../../utils/auth';

function App() {


  const [isFailInfoTooltipOpen, setisFailInfoTooltipOpen] = useState(false) // открытие всплывающих попапов
  const [isSuccessInfoTooltipOpen, setisSuccessInfoTooltipOpen] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false) //регистрация
  const [currentUser, setCurrentUser] = useState({});  //  Отправляем запрос в API и устанавливаем текущего юзера
  const [isApiError, setIsApiError] = useState(false); //Запрос не выполнен:
  const [userData, setUserData] = useState({
    username: '',
    email: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false); // обновление пользователя 
  const history = useHistory();

  const [preloading, setPreloading] = useState(false); // крутилка


  const handleFailInfoTooltipOpen = () => {
    console.log('handleFailInfoTooltipOpen');
    setisFailInfoTooltipOpen(true)
  }
  const handleSuccessInfoTooltipOpen = () => {
    console.log('handleSuccessInfoTooltipOpen');
    setisSuccessInfoTooltipOpen(true)
  }

  //закрываем все попапы
  const closeAllPopups = () => {
    setisFailInfoTooltipOpen(false);
    setisSuccessInfoTooltipOpen(false);
  };

  // ------------------------------functions------------------------------------

  function handleApiError(err) {
    console.log('Запрос не выполнен: ', err);
    setIsApiError(true);
  }


  function handleLogin(username, password) {
    // console.log('handleLogin: ');
    auth
      .authorize(username, password)
      .then((data) => {
        const userData = { username, password }
        localStorage.setItem('token', data.token);  // в localStorage записываем текущий token
        setUserData(userData)                       // устанавливаем данные юзера
        setLoggedIn(true)                           // меняем состояние на залогинен
      })
      .catch((err) => {
        console.log('handleLogin: catch ');
        setisFailInfoTooltipOpen(true);
        console.log(err);
      })
  }

  function handleRegister(email, password) {
    // console.log('handleRegister: ');
    auth
      .register(email, password)
      .then((res) => {
        setisSuccessInfoTooltipOpen(true);
        history.push('/signin')
      })
      .catch((err) => {
        console.log('handleRegister: catch ');
        setisFailInfoTooltipOpen(true);
        console.log(err);
      })
  }

  //Функция проверки токена в локальном хранилище
  const tokenCheck = () => {
    //Получаем токен из локального хранилища
    const token = localStorage.getItem('token');

    console.log('tokenCheck: token = ', token);

    if (localStorage.getItem('token')) {
      auth.getContent(token).then((res) => {
        if (res) {
          // console.log('111res = ', res);

          const { _id, email } = res;
          const userData = { _id, email }
          setUserData(userData)
          setLoggedIn(true)
          history.push('/');
        }
      });
    }
  }

  //разлогинивание
  function signOut() {
    localStorage.removeItem('token');
    setLoggedIn(false);
    history.push('/');
  }

  // Функция обновления пользователя 
  function handleUpdateUser(user) {
    console.log('Функция обновления пользователя');
    const { name, email } = user
    setIsSubmitting(true);
    // buttonText = "Сохраняется...";
    mainApi
      .updateUserInfo(name, email)
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(
        () => {
          setIsSubmitting(false);
          // buttonText = "Сохранить";
        }
      );
  }

  // ----------useEffect------------------------------------------------------------------
  const [movies, setMovies] = useState([]);
  //получаем массив фильмов
  useEffect(() => {
    console.log('useEffect');
    moviesApi
      .getAllMovies()
      .then((movies) => {
        console.log('moviesApi movies= ', movies);
        setMovies(movies)
      })
      .catch((err) => console.log(err));

  }, []);

  // кнопка Escape
  useEffect(() => {
    const closeByEscape = (e) => {
      if (e.key === 'Escape') {
        closeAllPopups();
      }
    }
    document.addEventListener('keydown', closeByEscape)
    return () => document.removeEventListener('keydown', closeByEscape)
  }, [])


  // Регистрация
  // Отправляем запрос в API и устанавливаем текущего юзера

  useEffect(() => tokenCheck(), [])

  useEffect(() => {
    if (!loggedIn) {
      return;
    }

    console.log('useEffect: loggedIn = ', loggedIn);
    history.push('/movies');

    mainApi.updateTokenInHeaders();

    mainApi.getUserInfo()
      .then(setCurrentUser)
      .catch((err) => {
        handleApiError(err);
      });
  }, [loggedIn]);

  //movies


  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <Header
          loggedIn={loggedIn}
        // signOut={signOut}
        // isLoggedIn={false}
        // isLoggedIn={true} 
        />

        <Switch>

          <Route path='/signup'>
            <Register handleRegister={handleRegister}
            />
          </Route>

          <Route path='/signin'>
            <Login handleLogin={handleLogin} />
          </Route>

          <Route exact path='/' >
            <Main />
            <Footer />
          </Route>


          <ProtectedRoute
            path='/movies'
            loggedIn={loggedIn}
            preloading={preloading}

            component={Movies}
          >
            <Footer />
          </ProtectedRoute>

          <ProtectedRoute
            path='/saved-movies'
            loggedIn={loggedIn}
            component={SavedMovies}
          >
            <Footer />
          </ProtectedRoute>

          <ProtectedRoute
            path='/profile'
            loggedIn={loggedIn}
            signOut={signOut}
            userData={userData}
            onUpdateUser={handleUpdateUser}
            component={Profile}
          >
          </ProtectedRoute>



          <Route path='*'>
            <PageNotFound />
          </Route>

        </Switch>

        {/* попап для не успешной регистрации */}
        <InfoTooltip
          onClose={closeAllPopups}
          isOpen={isFailInfoTooltipOpen}
          message={'Что-то пошло не так! Попробуйте ещё раз.'}
        />

        {/* /попап для успешной регистрации */}
        <InfoTooltip
          onClose={closeAllPopups}
          isOpen={isSuccessInfoTooltipOpen}
          message={'Поздравляю! Вы зарегистрировались'}
        />

      </CurrentUserContext.Provider>

    </>



  );
}

export default App;
