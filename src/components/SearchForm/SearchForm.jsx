import { Link } from 'react-router-dom';
import './search-form.css';

function SearchForm() {
  return (
    <section className='search_new'>

      <div className='search'>
        <form className='search__form' noValidate=''>
          <input className='search__input'
            placeholder='Фильм'
            type='text'
            defaultValue=''
          />
          <button className='search__button false' type='submit'>Поиск</button>
          <span className='search__error'></span>
        </form>
      </div>
      <div className='search__container'>
        <label className='checkbox'>
          <input type='checkbox' className='checkbox__input'/>
          <span className='checkbox__slider'></span>
        </label>
        <p className='search__text'>Короткометражки</p>
      </div>

    </section>
  );
}

export default SearchForm;