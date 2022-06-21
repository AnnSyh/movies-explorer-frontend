import React from 'react';
import { Route, NavLink } from 'react-router-dom';
import ProfileImgSrc from '../../images/icon-main.svg';

function NavBar(props) {

  console.log('NavBar: props = ', props);




  return (
    <>
      {/* { props.loggedIn  ? <p>залогинены</p> : <p>не залогинены </p>} */}

      {props.loggedIn ? (
        <>
          <ul className={`${props.isBurgerOpened ? 'header__nav header__nav_visible' : 'header__nav '}`}>
            <li className='header__only-mobile-link'>
              <NavLink to='/'
                       onClick={props.linkClick} 
                       className='header__linklogged'><span className="header__linklogged-text">Главная</span></NavLink>
            </li>
            <li>
              <NavLink to='/movies' 
                      onClick={props.linkClick}
                       activeClassName='header__linklogged-active' 
                       className='header__linklogged'><span className="header__linklogged-text">Фильмы</span></NavLink>
            </li>
            <li>
              <NavLink to='/saved-movies'
                       onClick={props.linkClick} 
                       activeClassName='header__linklogged-active' 
                       className='header__linklogged'><span className="header__linklogged-text">Сохранённые фильмы</span></NavLink>
            </li>
            <li className='header__pofile'>
              <NavLink to='/profile'
                       onClick={props.linkClick} 
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