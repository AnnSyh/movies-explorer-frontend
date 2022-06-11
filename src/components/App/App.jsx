import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
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


function App() {



  // открытие всплывающих попапов
  const [isFailInfoTooltipOpen, setisFailInfoTooltipOpen] = useState(false)
  const [isSuccessInfoTooltipOpen, setisSuccessInfoTooltipOpen] = useState(false)

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

  function handleLogin() {
    console.log('handleLogin');
    setisFailInfoTooltipOpen(true);
  }

  function handleRegister() {
    console.log('handleRegister');
    handleSuccessInfoTooltipOpen(true);
  }


  return (
    <>
      <Switch>

        <Route exact path='/signup'>
          <Register handleRegister={handleRegister}
          // handleFailInfoTooltipOpen={handleFailInfoTooltipOpen}
          // handleSuccessInfoTooltipOpen={handleSuccessInfoTooltipOpen}
          />
        </Route>

        <Route exact path='/signin'>
          <Login handleLogin={handleLogin} />
        </Route>

        <Route path='/' exact>
          <Header
            // loggedIn={loggedIn}
            isLoggedIn={false}
          // isLoggedIn={true} 
          />
          <Main />
          <Footer />
        </Route>
        <Route path='/movies'>
          {/* <Header isLoggedIn={false} /> */}
          <Header isLoggedIn={true} />
          <Movies />
          <Footer />
        </Route>
        <Route exact path='/saved-movies'>
          <Header isLoggedIn={true} />
          <SavedMovies />
          <Footer />
        </Route>

        <Route exact path='/profile'>
          <Header isLoggedIn={true} />
          <Profile />
        </Route>

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
    
    </>



  );
}

export default App;
