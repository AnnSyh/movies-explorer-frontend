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
import ImagePopup from '../ImagePopup/ImagePopup'; //всплывающие картинки
import InfoTooltip from '../InfoTooltip/InfoTooltip'; //всплывающие предупреждения
import Preloader from '../Preloader/Preloader'; //крутилка

import api from '../../utils/api';
import moviesApi from "../../utils/MoviesApi";
import mainApi from "../../utils/MainApi";

import CurrentUserContext from '../../contexts/CurrentUserContext';
import ProtectedRoute from '../../components/ProtectedRoute/ProtectedRoute';
import * as auth from '../../utils/auth';

function App() {

  const [isLoading, setIsLoading] = useState(false);

  const [cards, setCards] = useState([]);
  //получаем массив карточек
  useEffect(() => {

    setIsLoading(true);

    moviesApi
      .getAllMovies()
      .then((cards) => {
        setCards(cards);
      })
      .catch((err) => console.log(err));

  }, []);




  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false)//открытие попапа карточки скартинкой
  const handleImagePopupOpen = () => {
    console.log('handleImagePopupOpen');
    setIsImagePopupOpen(true)
  }


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
    setIsImagePopupOpen(false);
  };


  const [savedMovies, setSavedMovies] = useState(null);

  const [isDeleteMoviePopupOpen, setIsDeleteMoviePopupOpen] = useState(false);
  const [isSaveMoviePopupOpen, setIsSaveMoviePopupOpen] = useState(false);

  const [message, setMessage] = useState('');

  // ------------------------------functions------------------------------------

  function handleApiError(err) {
    console.log('Запрос не выполнен: ', err);
    setIsApiError(true);
  }

// авторизация пользователя (логин)
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

  // регистрация пользователя 
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
    setCurrentUser({});
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
      // .catch((err) => console.log(err))
      // .catch((err) => {
      //   console.log('handleUpdateUser: catch ');
      //   setisFailInfoTooltipOpen(true);
      //   console.log(err);
      // })
      .catch((e) => {
        setMessage(e.message);
        console.log('message = ', message);
      }
      )
      .finally(
        () => {
          setIsSubmitting(false);
          // buttonText = "Сохранить";
        }
      );
  }

  // добавление фильма в сохраненные
  // 'https://api.nomoreparties.co/' + card.image.url, 
  function handleSaveMovie(card) {
    mainApi.saveMovie(
                      card.country, 
                      card.director, 
                      card.duration, 
                      card.year, 
                      card.description, 
                      'https://api.nomoreparties.co/' + card.image.url, 
                      card.trailerLink, 
                      'https://api.nomoreparties.co/' + card.image.formats.thumbnail.url,
                      card.id, 
                      card.nameRU, 
                      card.nameEN
      )
      .then((res) => {
        setSavedMovies([...savedMovies, res]);
        localStorage.setItem('savedMovies', JSON.stringify([...savedMovies, res]));
      })
      .catch(() => {
        setIsSaveMoviePopupOpen(true);
      })
  }

  // удаление фильма изсохраненных
  function handleDeleteMovie(id) {
    mainApi.deleteMovie(id)
      .then((res) => {
        setSavedMovies(savedMovies.filter((movie) => !(movie._id === res._id)));
        localStorage.setItem('savedMovies', JSON.stringify(savedMovies.filter((movie) => !(movie._id === res._id))));
      })
      .catch(() => {
        setIsDeleteMoviePopupOpen(true);
      })
  }

  // получение сохраненных фильмов
  function getAllSavedMovies() {

    mainApi.updateTokenInHeaders();

    mainApi.getAllSavedMovies()
      .then((res) => {
        setSavedMovies(res);
        localStorage.setItem('savedMovies', JSON.stringify(res));
      })
      .catch((err) => {
        handleApiError(err);
      })
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


  //открываем попап с картинкой
  const [selectedCard, setSelectedCard] = useState({});
  // function handleCardClick(card) {
  //   console.log('handleCardClick');
  //   setSelectedCard(card)       //передаем  данные карточки
  //   setIsImagePopupOpen(true)   //открываем попап скартинкой
  //   setisFailInfoTooltipOpen(true)//открываем попап 'Что-то пошло не так!'
  // };


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
            cards={cards}
            handleSaveMovie={handleSaveMovie}

            handleImagePopupOpen={handleImagePopupOpen}
            // handleCardDeleteClick={handleCardDeleteClick}

            component={Movies}
          >
            <Footer />
          </ProtectedRoute>

          <ProtectedRoute
            path='/saved-movies'
            loggedIn={loggedIn}
            cards={cards}
            handleSaveMovie={handleSaveMovie}

            handleImagePopupOpen={handleImagePopupOpen}

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

        {/* /попап для картинки карточки */}
        <ImagePopup
          onClose={closeAllPopups}
          isOpen={isImagePopupOpen}
          name={selectedCard.name}
          link={selectedCard.link}
        />

      </CurrentUserContext.Provider>

    </>



  );
}

export default App;
