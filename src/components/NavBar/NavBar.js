import React from 'react';
import { Route, NavLink } from 'react-router-dom';
import ProfileImgSrc from "../../images/icon-main.svg";

function NavBar(props) {


  return (
      <ul className={`header__nav ${props.isBurgerOpened ? 'header__nav_visible' : ''}`}>
        
        {/* { props.loggedIn  ? <p>залогинены</p> : <p>не залогинены </p>} */}

        {props.loggedIn ? (
          <>
            <li className='header__only-mobile-link'>
              <NavLink to="/movies" activeClassName="header__linklogged-active" className="header__linklogged">Главная</NavLink>
            </li>
            <li>
              <NavLink to="/movies" activeClassName="header__linklogged-active" className="header__linklogged">Фильмы</NavLink>
            </li>
            <li>
              <NavLink to="/saved-movies" activeClassName="header__linklogged-active" className="header__linklogged">Сохранённые фильмы</NavLink>
            </li>
            <li className='pofile'>
              <NavLink to="/profile" activeClassName="header__linklogged-active" className="header__linklogged">
                Аккаунт 
                <span className="header__profile-icon" >
                  <img className="header__profile-img"  src={ProfileImgSrc} alt="профайл" />
                </span>
              </NavLink>
            </li>
          </>
        ) : (
          <>
          <li>
              <NavLink to="/signup" className="header__link">Регистрация</NavLink>
          </li>
          <li>
              <NavLink to="/signin" className="header__link header__link-active">Войти</NavLink>
          </li>
          </>
        )}
      </ul>
  );
}

export default NavBar;