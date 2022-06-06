import { Link } from "react-router-dom";
import './footer.css';

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__text">Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <div className="container footer__container">
        <p className="footer__copyright">© 2022</p>
        <nav className="footer__menu">
          <ul className="footer__list">
            <li>
              <Link target="_blank" className="footer__link" to="https://practicum.yandex.ru">Яндекс.Практикум</Link>
            </li>
            <li>
              <Link target="_blank" className="footer__link" to="https://practicum.yandex.ru">Github</Link>
            </li>
            <li>
              <Link target="_blank" className="footer__link" to="https://ru-ru.facebook.com/">Facebook</Link>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;