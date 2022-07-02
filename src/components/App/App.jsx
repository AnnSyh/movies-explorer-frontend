import React from 'react';
import { Route, Switch, useHistory, useLocation, Redirect } from 'react-router-dom';
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

import moviesApi from "../../utils/MoviesApi";
import mainApi from "../../utils/MainApi";
import {
  ERROR_CODE_INTERNAL_ADD,
  ERROR_CODE_INTERNAL_DEL,
  ERROR_409,
  ERROR_401,
  ERROR_TOO_MANY_REGUESTS,
  ERROR_CODE_NOT_FOUND,
  ERROR_CODE_BAD_REQUEST
} from "../../utils/config";

import CurrentUserContext from '../../contexts/CurrentUserContext';
import ProtectedRoute from '../../components/ProtectedRoute/ProtectedRoute';
import * as auth from '../../utils/auth';

function App() {

  const [isLoading, setIsLoading] = useState(false);
  const [cards, setCards] = useState([]);
  const [popupOpen, setPopupOpen] = useState(false)//открытие попапа общего
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
  const [savedMovies, setSavedMovies] = useState([]); //сохраняем сюда выбранные фильмы
  // console.log('111 savedMovies = ', savedMovies);
  const [filteredMovies, setFilteredMovies] = useState(JSON.parse(localStorage.getItem('filteredMovies')) || null);
  const { pathname } = useLocation();
  const [messageText, setMessageText] = useState('сообщения для ошибок');// сообщения для ошибок

  const footerEndpoints = ['/movies', '/saved-movies', '/'];
  // ------------------------------functions------------------------------------

  //закрываем все попапы
  const closeAllPopups = () => {
    setisSuccessInfoTooltipOpen(false);
    setPopupOpen(false);
  };

  //открытие попапа общего с инфой
  const handlePopupOpen = () => {
    setPopupOpen(true)
  }

  function handleApiError(err) {
    console.log('Запрос не выполнен: ', err);
    setIsApiError(true);
  }


  // регистрация пользователя 
  function handleRegister(data) {
    auth
      .register(data)
      .then((res) => {
        // setisSuccessInfoTooltipOpen(true);
        // history.push('/signin')
        console.log('Register: res = ', res);
        if (res._id) {
          const newData = {
            email: data.email,
            password: data.password
          }
          handleLogin(newData);
        }
      }
      )
      .catch((err) => {
        if (err === 'Ошибка: 400' || err === 'Ошибка: 500' || err === 'Ошибка: 404') {
          setMessageText(`Register: catch: ` + ERROR_CODE_INTERNAL_ADD);
          setPopupOpen(true);
        }
        if (err === 409) {
          setMessageText(ERROR_409);
          setPopupOpen(true);
        } else {
          console.log('err = ',err);
          // setMessageText(`Register: handleLogin: catch: ` + err);
          setMessageText(ERROR_TOO_MANY_REGUESTS);
          setPopupOpen(true);
        }
      })
  }

  // авторизация пользователя (логин)
  function handleLogin(data) {
    auth
      .authorize(data)
      .then((data) => {
        localStorage.setItem('token', data.token);  // в localStorage записываем текущий token
        setUserData(data)                           // устанавливаем данные юзера
        setLoggedIn(true)                           // меняем состояние на залогинен

        history.push('/movies');
        // setMessageText(`Добро пожаловать!` +  currentUser.name);        // сообщение об удачной авторизации/регистрации
        setMessageText(`Добро пожаловать!`);        // сообщение об удачной авторизации/регистрации
        setPopupOpen(true);
      })
      .catch((err) => {
        if (err === 'Ошибка: 400' || err === 'Ошибка: 500' || err === 'Ошибка: 404') {
          setMessageText(`Login: catch: ` + ERROR_CODE_INTERNAL_ADD);
          setPopupOpen(true);
        }
        if (err === 401) {
          setMessageText(ERROR_401);
          setPopupOpen(true);
        } else {
          // setMessageText(`Login: handleLogin: catch: ` + err);
          setMessageText(ERROR_TOO_MANY_REGUESTS);
          setPopupOpen(true);
        }
      })
  }


  //Функция проверки токена в локальном хранилище
  const tokenCheck = () => {
    //Получаем токен из локального хранилища
    const token = localStorage.getItem('token');

    console.log('tokenCheck: token = ', token);

    if (localStorage.getItem('token')) {
      auth
        .getContent(token)
        .then((res) => {
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
    // localStorage.removeItem('token');
    localStorage.clear();
    setLoggedIn(false);
    setCurrentUser({});
    history.push('/');
  }

  // Функция обновления пользователя 
  function handleUpdateUser(user) {
    const { name, email } = user
    setIsSubmitting(true);
    mainApi
      .updateUserInfo(name, email)
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch((e) => {
        // console.log('message = ', e);
        setMessageText(`Введите другие данные ` + ERROR_409);
        setPopupOpen(true);
      }
      )
      .finally(
        () => {
          setIsSubmitting(false);
        }
      );
  }



  // Функция добавление фильма в сохраненные(клик по чекбоксу карточки фильма)
  // 'https://api.nomoreparties.co/' + card.image.url, 
  function handleSaveMovie(card) {

    mainApi.saveMovie(
      card.country || 'unknown',
      card.director || 'unknown',
      card.duration || 0,
      card.year || 'unknown',
      card.description || 'unknown',
      'https://api.nomoreparties.co/' + card.image.url || 'https://unknown',
      card.trailerLink || 'https://unknown',
      'https://api.nomoreparties.co/' + card.image.formats.thumbnail.url || 'https://unknown',
      card.id,
      card.nameRU || 'без имени',
      card.nameEN || 'unknown'
    )
      .then((res) => {
        setSavedMovies([res, ...savedMovies]);
      })
      .catch((err) => {
        if (err === 'Ошибка: 500') {
          setMessageText(ERROR_CODE_INTERNAL_ADD);
          setPopupOpen(true);
        }
        if (err === 'Ошибка: 400') {
          setMessageText(ERROR_CODE_BAD_REQUEST);
          setPopupOpen(true);
        }
        if (err === 'Ошибка: 404') {
          setMessageText(ERROR_CODE_NOT_FOUND);
          setPopupOpen(true);
        }
        console.log('saveMovie: catch: err = ', err);
      })

  }

  // Функция удаления фильма
  function handleDeleteMovie(movie) {
    const savedMovie = savedMovies.find(
      (item) => item.movieId === movie.id || item.movieId === movie.movieId
      )
    mainApi.deleteMovie(savedMovie._id)
      .then(() => {
        const newMoviesList = savedMovies.filter((m) => {
          if (movie.id === m.movieId || movie.movieId === m.movieId) {
            return false
          } else {
            return true
          }
        })
        setSavedMovies(newMoviesList);
        localStorage.setItem(`${currentUser.email} - savedMovies`, JSON.stringify(newMoviesList));
      })
      .catch((err) => {
        if (err === 'Ошибка: 500') {
          setMessageText(ERROR_CODE_INTERNAL_DEL);
          setPopupOpen(true);
        }
        if (err === 'Ошибка: 400') {
          setMessageText(ERROR_CODE_BAD_REQUEST);
          setPopupOpen(true);
        }
        if (err === 'Ошибка: 404') {
          setMessageText(ERROR_CODE_NOT_FOUND);
          setPopupOpen(true);
        }
        console.log('saveMovie: catch: err = ', err);
      });
  };


  // Функция получение фильмов и сохранение их 
  function getSavedMovies() {

    mainApi
      .updateTokenInHeaders();

    mainApi
      .getSavedMovies()
      .then((res) => {
        setSavedMovies(res);
        localStorage.setItem(`${currentUser.email} - savedMovies`, JSON.stringify(res));
        console.log('localStorage.savedMovies = ', localStorage.savedMovies);
      })
      .catch((err) => {
        handleApiError(err);
        setMessageText(`getSavedMovies: catch: ` + err);
        setPopupOpen(true);
      })
  }

  // ----------useEffect------------------------------------------------------------------

  //получаем массив карточек фильмов
  useEffect(() => {
    setIsLoading(true);

    moviesApi
      .getAllMovies()
      .then((cards) => {
        setCards(cards);
      })
      .catch(err => {
        setMessageText(`getAllMovies: catch: ` + err);
        setPopupOpen(true);
      })

  }, []);

  //получение сохраненных пользователем фильмов
  useEffect(() => {
    if (loggedIn && currentUser) {
      mainApi
        .getSavedMovies()
        .then((data) => {
          // setSavedMovies(data.movies); 
          // localStorage.setItem(`${currentUser.email} - savedMovies`, JSON.stringify(data.movies));
          const UserMoviesList = data.movies.filter(m => m.owner === currentUser._id);
          setSavedMovies(UserMoviesList);
          localStorage.setItem(`${currentUser.email} - savedMovies`, JSON.stringify(UserMoviesList));
        })
        .catch(err => {
          setMessageText(`getSavedMovies: catch: ` + err);
          setPopupOpen(true);
        })
    }
  }, [currentUser, loggedIn]);


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
    const path = pathname;

    mainApi.updateTokenInHeaders();
    mainApi
      .getUserInfo()
      // .then(setCurrentUser)
      .then((data) => {

        if(data){
          setLoggedIn(true);
          setCurrentUser(data);
          history.push(path);
        }

      })
      .catch((err) => {
        handleApiError(err);
        // setMessageText(`useEffect() getUserInfo catch: ` + err);
        // setPopupOpen(true);
      });
  }, [loggedIn]);

  // ------------------------------

  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <Header
          loggedIn={loggedIn}
          pathname={pathname}
        />

        <Switch>

          <Route exact path='/signup'>
            {!loggedIn ? (
              <Register handleRegister={handleRegister} />
            ) : (
              <Redirect to='/' />
            )}
          </Route>
          <Route exact path='/signin'>
            {!loggedIn ? (
              <Login handleLogin={handleLogin} />
            ) : (
              <Redirect to='/' />
            )}
          </Route>

          <Route exact path='/' >
            <Main />
          </Route>

          <ProtectedRoute path='/movies'
            loggedIn={loggedIn}
            preloading={preloading}
            cards={cards}
            pathname={pathname}
            isLoading={isLoading}
            handleSaveMovie={handleSaveMovie}
            handleDeleteMovie={handleDeleteMovie}
            savedMovies={savedMovies}
            setFilteredMovies={setFilteredMovies}
            handlePopupOpen={handlePopupOpen}
            component={Movies}

          // showCardList={showCardList}
          >
          </ProtectedRoute>

          <ProtectedRoute path='/saved-movies'
            loggedIn={loggedIn}
            preloading={preloading}
            cards={cards}
            pathname={pathname}
            isLoading={isLoading}
            handleSaveMovie={handleSaveMovie}
            handleDeleteMovie={handleDeleteMovie}
            setFilteredMovies={setFilteredMovies}
            handlePopupOpen={handlePopupOpen}
            component={SavedMovies}

            savedMovies={savedMovies}

          // showCardList={showCardList}
          >
          </ProtectedRoute>

          <ProtectedRoute path='/profile'
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
        <Route exact path={footerEndpoints}>
          <Footer />
        </Route>

        {/* попап с ошибкой */}
        <InfoTooltip
          message={messageText}
          isOpen={popupOpen}
          onClose={closeAllPopups}
        />

        {/* попап для успешной регистрации */}
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
