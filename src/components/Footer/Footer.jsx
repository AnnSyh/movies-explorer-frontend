import { Link } from 'react-router-dom';
import ArrowTop from '../ArrowTop/ArrowTop';
import './footer.css';

function Footer() {
  return (
    <footer className='footer'>
      <p className='footer__text'>Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <div className='container footer__container'>
        <p className='footer__copyright'>© 2022</p>
        <nav className='footer__menu'>
          <ul className='footer__list'>
            <li>
              <a target='_blank' className='footer__link' href='https://practicum.yandex.ru'>Яндекс.Практикум</a>
            </li>
            <li>
              <a target='_blank' className='footer__link' href='https://practicum.yandex.ru'>Github</a>
            </li>
            <li>
              <a target='_blank' className='footer__link' href='https://ru-ru.facebook.com/'>Facebook</a>
            </li>
          </ul>
        </nav>

        <ArrowTop/>

      </div>
    </footer>
  );
}

export default Footer;