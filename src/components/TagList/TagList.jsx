import './tag-list.css';

function TagList() {
  return (
        <ul className='tag-list'>
          <li className='tag-list__item'>
            <a className='tag-list__link' href='#about-project'>О проекте</a>
          </li>
          <li className='tag-list__item'>
            <a className='tag-list__link' href='#technology'>Технологии</a>
          </li>
          <li className='tag-list__item'>
            <a className='tag-list__link' href='#student'>Студент</a>
          </li>
        </ul>
  );
}

export default TagList;