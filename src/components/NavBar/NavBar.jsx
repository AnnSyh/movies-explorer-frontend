import React from 'react';
import { Route, NavLink } from 'react-router-dom';
import ProfileImgSrc from '../../images/icon-main.svg';

function NavBar(props) {

  //убираем .header__overlay-visible при переходе на гл стр 
  function linkClick() {
    const headerNav = document.querySelector('.header__nav');
    headerNav.classList.remove('header__nav_visible');
    const overlay = document.querySelector('.header__overlay-visible');
    overlay.classList.remove('header__overlay-visible')
    // const hamburger = document.querySelector('.hamburger');
    // hamburger.classList.remove('open')
    // hamburger.classList.add('closed')
  }


  return (
    <>
      {/* { props.loggedIn  ? <p>залогинены</p> : <p>не залогинены </p>} */}

      {props.loggedIn ? (
        <>
          <ul className={`${props.isBurgerOpened ? 'header__nav header__nav_visible' : 'header__nav '}`}>
            <li className='header__only-mobile-link'>
              <NavLink to='/'
                       onClick={linkClick} 
                       className='header__linklogged'><span className="header__linklogged-text">Главная</span></NavLink>
            </li>
            <li>
              <NavLink to='/movies' 
                      onClick={linkClick}
                       activeClassName='header__linklogged-active' 
                       className='header__linklogged'><span className="header__linklogged-text">Фильмы</span></NavLink>
            </li>
            <li>
              <NavLink to='/saved-movies'
                       onClick={linkClick} 
                       activeClassName='header__linklogged-active' 
                       className='header__linklogged'><span className="header__linklogged-text">Сохранённые фильмы</span></NavLink>
            </li>
            <li className='header__pofile'>
              <NavLink to='/profile'
                       onClick={linkClick} 
                       activeClassName='header__linklogged-active' 
                       className='header__linklogged'>
                <span className="header__linklogged-text">Аккаунт</span>
                <span className='header__profile-icon' >
                  <img className='header__profile-img' src={ProfileImgSrc} alt='профайл' />
                </span>
              </NavLink>
            </li>
          </ul>
          </>
  ) : (
    <>
      <ul className='header__nav-no-logined'>
        <li>
          <NavLink to='/signup' className='header__link' activeClassName='header__link-active'>Регистрация</NavLink>
        </li>
        <li>
          <NavLink to='/signin' className='header__link header__link-active' activeClassName='header__link-active'>Войти</NavLink>
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