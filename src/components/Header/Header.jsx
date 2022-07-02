import { Link } from 'react-router-dom';
import { useState } from 'react';
import logoSrc from '../../images/logo.svg';
import burgerMenuSrc from '../../images/burger-menu.svg';
import burgerMenuCloseSrc from '../../images/Cros.svg';
import './header.css';
import Navbar from '../NavBar/NavBar';

function Header(props) {
  // console.log('Header: props.pathname = ', props.pathname);

  const [isBurgerOpened, setIsBurgerOpened] = useState(false);

  function handleBurgerIconClick() {
    setIsBurgerOpened(!isBurgerOpened);
  }

  //это должно работать для десктопа без серого закрывающего фона
  //закрываем меню при переходе настр (т.е. при клике по пункту меню)
  function linkClick() {
    setIsBurgerOpened(!isBurgerOpened);
  }

  return (
    <>
      <div id='top'></div>
      <header
        className={
          props.pathname === '/signup' || props.pathname === '/signin'
            ? 'header header__hidden'
            : 'header'
        }
      >
        <div className='header__container'>
          <div className='header__mobile'>
            <Link to='/' className='header__mobile-logo-link'>
              <img className='logo header__container__logo' src={logoSrc} alt='логотип' />
            </Link>
            <div className={`hamburger ${isBurgerOpened ? 'open' : 'closed'}
                            ${props.loggedIn ? 'LoggedIn' : 'noLoggedIn'} `}
              onClick={handleBurgerIconClick}
            >
              <img className='hamburger__img' src={` ${isBurgerOpened ? burgerMenuCloseSrc : burgerMenuSrc} `} alt='бургер' />
            </div>
          </div>
          <div className={isBurgerOpened
            ? 'header__overlay-visible'
            : 'header__overlay-unvisible'}></div>
          <Navbar
            loggedIn={props.loggedIn}
            isBurgerOpened={isBurgerOpened}
            linkClick={linkClick}
          />
        </div>
      </header>
    </>
  );
}

export default Header;