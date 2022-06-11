import { Link } from 'react-router-dom';
import './technology.css';
import '../TagList/tag-list.css';

// import TagList from '../TagList/TagList';

function Technology() {
  return (
    <section className='technology section section_technology'>
      <div className='section__header'>

      <div id='technology'></div>

        <h2 className='section__title'>Технологии</h2>
      </div>
      <div className='technology__wrapper'>
        <h1 className='technology__title'>7 технологий</h1>
        <div className='technology__lid'>
          На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.
        </div>
        <ul className='tag-list tag-list--technology'>
          <li className='tag-list__item tag-list__item--technology'><span className='tag-list__link tag-list__link--technology' href=''>HTML</span></li>
          <li className='tag-list__item tag-list__item--technology'><span className='tag-list__link tag-list__link--technology' href=''>CSS</span></li>
          <li className='tag-list__item tag-list__item--technology'><span className='tag-list__link tag-list__link--technology' href=''>JS</span></li>
          <li className='tag-list__item tag-list__item--technology'><span className='tag-list__link tag-list__link--technology' href=''>React</span></li>
          <li className='tag-list__item tag-list__item--technology'><span className='tag-list__link tag-list__link--technology' href=''>Git</span></li>
          <li className='tag-list__item tag-list__item--technology'><span className='tag-list__link tag-list__link--technology' href=''>Express.js</span>
          </li>
          <li className='tag-list__item'><span className='tag-list__link tag-list__link--technology' href=''>mongoDB</span></li>
        </ul>
      </div>
    </section>
  );
}

export default Technology;