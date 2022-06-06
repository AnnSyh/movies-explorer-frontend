import { Link, NavLink } from "react-router-dom";
import './student.css';
import studentSrc from "../../images/student.png";

function Student() {
  return (
    <section className="student section">
      <div className="section__header">
        <a name="student"></a>
        {/* <Link name="student"></Link> */}
        <h2 className="section__title">Студент</h2>
      </div>
      <div className="student__wrapper">
        <div className="student__info">
          <div className="student__text">
            <div className="student__text-wrapper">
              <div className="student__title">Виталий</div>
              <div className="student__subtitle">Фронтенд-разработчик, 30 лет</div>
              <div className="student__text">
                Я родился и живу в Саратове, закончил факультет экономики СГУ.
                У меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом.
                Недавно начал кодить. С 2015 года работал в компании «СКБ Контур».
                После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами
                и ушёл с постоянной работы.
              </div>
            </div>

            <div className="student__links">
              <Link to="/">Facebook</Link>
              <Link to="/">Github</Link>
            </div>
          </div>
          <div className="student__foto">
            <img src={studentSrc} alt="фото студента" />
          </div>
        </div>

        <div className="student__portfolio">
          <div className="student__portfolio-title">Портфолио</div>
          <ul className="student__portfolio-list">
            <li>
              <Link className="student__portfolio-link" to="/" target="_blank">Статичный сайт</Link>
            </li>
            <li>
              <Link className="student__portfolio-link" to="/" target="_blank">Адаптивный сайт</Link>
            </li>
            <li>
              <Link className="student__portfolio-link" to="/" target="_blank">Одностраничное приложение</Link>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default Student;