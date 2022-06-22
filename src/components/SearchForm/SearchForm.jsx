import React from "react";
import { useState } from 'react';
import './search-form.css';
import {useFormWithValidation } from '../../hooks/useForm';

function SearchForm(props) {

// console.log('SearchForm: props = ',props)

  const [error, setError] = useState();
  // ----------------------------
  const { values, handleChangeInput, isValid} = useFormWithValidation()  // хук валидации полей формы

  function clearError() {
    setError(null);
  }


  function handleSubmitForm(e) {
    clearError();
    e.preventDefault();

    if (isValid) {
      props.handleSearchSubmit(values.movie);
    } 
  }


  return (
    <section className='search_new'>

      <div className='search'>
        <form
          className='search__form'
          noValidate
          onSubmit={handleSubmitForm}
        >
          <input
            className='search__input'
            name='movie'
            type='text'
            placeholder='Фильм'
            autoComplete='off'
            // value={values.movie || props.inputValue}
            value={values.movie || ''}
            onChange={handleChangeInput}
            required
          />
            <span className='search__error'>
              {
              !isValid
                ? 'Нужно ввести ключевое слово.'
                : ''
            }
              </span>
          <button
            type='submit'
            className={
              !isValid
                ? 'search__button'
                : 'search__button link search__button-valid'
            }
            disabled={!isValid}
          >Поиск
          </button>
        </form>
      </div>
      <div className='search__container'>
        <label className='checkbox'>
          <input
            type='checkbox'
            className='checkbox__input'

            checked={props.shortMovies || false}
            onChange={props.checkBoxClick}

          />
          <span className='checkbox__slider'></span>
        </label>
        <p className='search__text'>Короткометражки</p>
      </div>

    </section>
  );
}

export default SearchForm;