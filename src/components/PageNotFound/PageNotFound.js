import React from 'react';
import { Link } from 'react-router-dom';
import './page-not-found.css';


function PageNotFound() {
  return (
    <div className="page-not-found">

      <div className="page-not-found__info">
        <h1 className='page-not-found__title'>404</h1>
        <h2 className='page-not-found__subtitle'>Страница не найдена</h2>
      </div>

       <Link to="/" className="page-not-found__link">Назад</Link>
    </div>
  );
}

export default PageNotFound;
