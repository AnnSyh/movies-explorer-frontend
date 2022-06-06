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


function App() {

  const handleFailInfoTooltipOpen = () => {
    console.log('handleFailInfoTooltipOpen');
    // setisFailInfoTooltipOpen(true)
  }
  const handleSuccessInfoTooltipOpen = () => {
    console.log('handleSuccessInfoTooltipOpen');
    // setisSuccessInfoTooltipOpen(true)
  }



  return (
    <Switch>

      <Route exact path="/signup">
        <Register
        // handleFailInfoTooltipOpen={handleFailInfoTooltipOpen}
        // handleSuccessInfoTooltipOpen={handleSuccessInfoTooltipOpen}
        />
      </Route>

      <Route exact path="/signin">
        <Login
        // handleLogin={handleLogin} 
        />
      </Route>

      <Route path="/" exact>
        <Header
        // loggedIn={loggedIn}
        />
        <Main />
        <Footer />
      </Route>
      <Route path="/movies">
        {/* <Header isLoggedIn={false} /> */}
        <Header isLoggedIn={true} />
        <Movies />
        <Footer />
      </Route>
      <Route exact path="/saved-movies">
        <Header isLoggedIn={true} />
        <p>SavedMovies</p>
        {/* <SavedMovies /> */}
        <Footer />
      </Route>

      <Route exact path="/profile">
        <Header isLoggedIn={true} />
        <Profile />
      </Route>

      <Route path="*">
        <PageNotFound />
      </Route>

    </Switch>
  );
}

export default App;
