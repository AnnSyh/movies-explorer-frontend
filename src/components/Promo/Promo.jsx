import { Link, NavLink } from 'react-router-dom';
import './promo.css';

import TagList from '../TagList/TagList';

function Promo() {
  return (
    <section className='promo'>
      <h1 className='promo__title'>Учебный проект студента факультета <span className='nowrap'>Веб-разработки</span>.</h1>
      <nav className='promo__menu'>
        <TagList />
      </nav>
    </section>
  );
}

export default Promo;