import React from 'react';
import { Route, Switch, Redirect, useHistory, useLocation } from 'react-router-dom';
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
import { // ERROR_CODE_INTERNAL
  BASE_URL,
  MOVIES_URL,
  ERROR_CODE_INTERNAL_DEL,
  ERROR_CODE_INTERNAL_ADD

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

  const [savedMovies, setSavedMovies] = useState({}); //сохраняем сюда выбранные фильмы
  const [filteredMovies, setFilteredMovies] = useState(JSON.parse(localStorage.getItem('filteredMovies')) || null);

  const [isDeleteMoviePopupOpen, setIsDeleteMoviePopupOpen] = useState(false);
  const [isSaveMoviePopupOpen, setIsSaveMoviePopupOpen] = useState(false);

  const [message, setMessage] = useState('');

  const [movies, setMovies] = useState([]);

  const { pathname } = useLocation();

  const [messageText, setMessageText] = React.useState('сообщения для ошибок');// сообщения для ошибок

  // ------------------------------functions------------------------------------

  const handleSuccessInfoTooltipOpen = () => {
    setisSuccessInfoTooltipOpen(true)
  }

  //закрываем все попапы
  const closeAllPopups = () => {
    setisSuccessInfoTooltipOpen(false);
    setPopupOpen(false);
  };

  const handlePopupOpen = () => { //открытие попапа общегосинфой
    setPopupOpen(true)
  }

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
        setMessageText(`handleLogin: catch: ` + err);
        setPopupOpen(true);
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
        setMessageText(`handleRegister: catch: ` + err);
        setPopupOpen(true);
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
      .catch((e) => {
        // setMessage(e.message);
        // console.log('message = ', message);
        setMessageText(`handleUpdateUser: catch: ` + e + `e.message = ` + e.message);
        setPopupOpen(true);
      }
      )
      .finally(
        () => {
          setIsSubmitting(false);
          // buttonText = "Сохранить";
        }
      );
  }


  // Функция добавление фильма в сохраненные(клик по чекбоксу карточки филима)
  // 'https://api.nomoreparties.co/' + card.image.url, 
  function handleSaveMovie(card) {

    const extantMovie = savedMovies.movies.find((item) => (item.movieId === card.id || item.movieId === card.movieId));
    if (extantMovie !== 0) {
      setMessageText('такой фильм у вас уже есть');
      setPopupOpen(true);

    } else {

      mainApi.saveMovie(
        card.country || 'unknown',
        card.director || 'unknown',
        card.duration || 0,
        card.year || 'unknown',
        card.description || 'unknown',
        'https://api.nomoreparties.co/' + card.image.url || 'unknown',
        card.trailerLink || 'unknown',
        'https://api.nomoreparties.co/' + card.image.formats.thumbnail.url || 'unknown',
        card.id,
        card.nameRU || 'unknown',
        card.nameEN || 'unknown'
      )
        .then((res) => {
          setSavedMovies([...savedMovies, res]);
          localStorage.setItem('savedMovies', JSON.stringify([...savedMovies, res]));
        })
        .catch((err) => {
          console.log('saveMovie: catch: err = ', err);
          // errorsApi(err)
          if (err === 'Ошибка: 400' || err === 'Ошибка: 500' || err === 'Ошибка: 404') {
            setMessageText(ERROR_CODE_INTERNAL_ADD);
            setPopupOpen(true);
          } else {
            setMessageText('фильм успешно добавился');
            setPopupOpen(true);
          }
        })

    }

  }

  //удаление фильма
  function handleDeleteMovie(movie) {

    if (savedMovies.movies.length === 0 || savedMovies.length === 0) {
      setMessageText('не откуда удалить фильм т.к. у вас нет сохраненных фильмов!!!');
      setPopupOpen(true);
    } 
    // else if ( savedMovies.movie === undefined ) {
    //   setMessageText('удаляешь фильм которого нет');
    //   setPopupOpen(true);
      
    // }
     else {

      const dellMovie = savedMovies.movies.find((item) => (item.movieId === movie.id || item.movieId === movie.movieId));

      mainApi
        .deleteMovie(dellMovie._id)
        .then((res) => {
          // setSavedMovies([...savedMovies, res]);
          setSavedMovies(savedMovies.movies.filter((movie) => !(movie.id === res._id)));
          localStorage.setItem('savedMovies', JSON.stringify(savedMovies.movies.filter((movie) => !(movie.id === res._id))));
        })
        .catch((err) => console.log(err));

    }

  };

  // Функция получение фильмов и сохранение их 
  function getSavedMovies() {

    mainApi
      .updateTokenInHeaders();

    mainApi
      .getSavedMovies()
      .then((res) => {
        setSavedMovies(res);
        localStorage.setItem('savedMovies', JSON.stringify(res));
        console.log('localStorage.savedMovies = ', localStorage.savedMovies);
      })
      .catch((err) => {
        handleApiError(err);
        setMessageText(`getSavedMovies: catch: ` + err);
        setPopupOpen(true);
      })
  }



  // ----------useEffect------------------------------------------------------------------

  //   // состояние карточки  лайкнутые/нет
  //   useEffect(() => {
  //     if (localStorage.getItem('saved2') === 'true') {
  //         setSaved(true);
  //     } else {
  //         setSaved(false);
  //     }
  // }, [currentUser]);



  //получение сохраненных пользователем фильмов
  useEffect(() => {
    if (loggedIn) {
      mainApi
        .getSavedMovies()
        .then((data) => {
          console.log('111 SavedUserMovies data = ', data)
          console.log('111 SavedUserMovies data.movies = ', data.movies)
          setSavedMovies(data);
          localStorage.setItem('savedMovies', JSON.stringify(data.movies));
        })
        .catch(err => {
          setMessageText(`getSavedMovies: catch: ` + err);
          setPopupOpen(true);
        })
    }
  }, [loggedIn]);


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
    history.push('/movies');
    mainApi.updateTokenInHeaders();
    mainApi
      .getUserInfo()
      .then(setCurrentUser)
      .catch((err) => {
        handleApiError(err);
        setMessageText(`useEffect() getUserInfo catch: ` + err);
        setPopupOpen(true);
      });
  }, [loggedIn]);


  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <Header
          loggedIn={loggedIn}
          pathname={pathname}
        />

        <Switch>

          <Route path='/signup'>
            <Register
              handleRegister={handleRegister}
            />
          </Route>

          <Route path='/signin'>
            <Login handleLogin={handleLogin} />
          </Route>

          <Route exact path='/' >
            <Main />
            <Footer />
          </Route>


          <ProtectedRoute path='/movies'
            loggedIn={loggedIn}
            preloading={preloading}
            cards={cards}
            pathname={pathname}

            handleSaveMovie={handleSaveMovie}
            handleDeleteMovie={handleDeleteMovie}

            isLoading={isLoading}
            setFilteredMovies={setFilteredMovies}

            handlePopupOpen={handlePopupOpen}

            component={Movies}
          >
            <Footer />
          </ProtectedRoute>

          <ProtectedRoute path='/saved-movies'
            loggedIn={loggedIn}
            cards={cards}
            pathname={pathname}

            isLoading={isLoading}
            handleSaveMovie={handleSaveMovie}
            handleDeleteMovie={handleDeleteMovie}

            savedMovies={savedMovies}
            setFilteredMovies={setFilteredMovies}

            handlePopupOpen={handlePopupOpen}

            component={SavedMovies}
          >
            <Footer />
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

        {      /* попап с ошибкой */}
        <InfoTooltip
          message={messageText}
          isOpen={popupOpen}
          onClose={closeAllPopups}
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
