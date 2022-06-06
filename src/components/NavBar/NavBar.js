import React from 'react';
import { Route, NavLink } from 'react-router-dom';
import ProfileImgSrc from "../../images/icon-main.svg";

function NavBar(props) {

  console.log('NavBar: props = ', props);
  console.log('NavBar: props.loggedIn = ', props.loggedIn);

  // if (!props.loggedIn) {
  //   props.isBurgerOpened = true;
  // }


  return (
    <>
      {/*  <ul className={`${props.isBurgerOpened ? 'header__nav header__nav_visible' : 'header__nav '}`}> */}

      {/* { props.loggedIn  ? <p>залогинены</p> : <p>не залогинены </p>} */}

      {props.loggedIn ? (
        <>
          <ul className={`${props.isBurgerOpened ? 'header__nav header__nav_visible' : 'header__nav '}`}>
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
                  <img className="header__profile-img" src={ProfileImgSrc} alt="профайл" />
                </span>
              </NavLink>
            </li>
          </ul>
          </>
  ) : (
    <>
      <ul className='header__nav-no-logined'>
        <li>
          <NavLink to="/signup" className="header__link">Регистрация</NavLink>
        </li>
        <li>
          <NavLink to="/signin" className="header__link header__link-active">Войти</NavLink>
        </li>
      </ul>
    </>
  )
}
{/*  </ul> */ }
      </>
  );
}

export default NavBar;