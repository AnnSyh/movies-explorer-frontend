import { Link, NavLink } from 'react-router-dom';
import './student.css';
import studentSrc from '../../images/student.png';

function Student() {
  return (
    <section className='student section section_student'>
      <div className='section__header'>

        <div id='student'></div>

        <h2 className='section__title'>Студент</h2>
      </div>
      <div className='student__wrapper'>
        <div className='student__info'>
          <div className='student__text'>
            <div className='student__text-wrapper'>
              <div className='student__title'>Анна</div>
              <div className='student__subtitle'>Фронтенд-разработчик, 43 года</div>
              <div className='student__text'>
                Я родилась и живу в Ростове-на-Дону, закончила механико-математический факультет РГУ.
                У меня есть муж и сын. Я люблю слушать музыку, а ещё увлекаюсь бегом.
                Недавно начала кодить. С 2015 года работал в компании «СКБ Контур».
                После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами
                и ушёл с постоянной работы.
              </div>
            </div>

            <div className='student__links'>
              <Link to='/'>Facebook</Link>
              <Link to='/'>Github</Link>
            </div>
          </div>
          <div className='student__foto'>
            <img src={studentSrc} alt='фото студента' />
          </div>
        </div>

        <div className='student__portfolio'>
          <div className='student__portfolio-title'>Портфолио</div>
          <ul className='student__portfolio-list'>
            <li>
              <a className='student__portfolio-link' href='https://github.com/AnnSyh/how-to-learn' target='_blank'>Статичный сайт</a>
            </li>
            <li>
              <a className='student__portfolio-link' href='https://annsyh.github.io/russian-travel/' target='_blank'>Адаптивный сайт</a>
            </li>
            <li>
              <a className='student__portfolio-link' href='https://github.com/AnnSyh/react-mesto-api-full' target='_blank'>Одностраничное приложение</a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default Student;