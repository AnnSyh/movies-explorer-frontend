import React from "react";
import { useState } from 'react';
import './search-form.css';
import { useForm, useFormWithValidation } from '../../hooks/useForm';

function SearchForm() {
  const [error, setError] = useState();
  const [onlyShortFilms, setOnlyShortFilms] = useState(false);
  // ----------------------------
  const { values, handleChangeInput, errors, isValid, resetForm } = useFormWithValidation()  // хук валидации полей формы

  function clearError() {
    setError(null);
  }

  function handleSwitch(e) {
    setOnlyShortFilms(!onlyShortFilms);
  }

  function handleSubmitForm(e) {
    clearError();
    e.preventDefault();
    console.log('handleSubmitForm');

    if (isValid) {
      console.log('SearchForm (handleSubmitForm): isValid = ', isValid);
      // добавить сюда поиск и выбор фильмов по ключевому слову 
      console.log('добавить сюда поиск и выбор фильмов по ключевому слову');
      // serchRezalt????

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
            placeholder='Фильм'
            className='search__input'
            type='text'
            required
            name='movie'
            autoComplete='on'
            minLength='1'
            maxLength='15'
            value={values.movie || ''}
            onChange={handleChangeInput}
          />
          <button
            type='submit'
            className={
              !isValid
                ? 'search__button'
                : 'search__button link search__button-valid'
            }
            disabled={!isValid}
          >
            Поиск
          </button>
          <span className='search__error'>
            {
              !isValid
                ? 'Введите ключевое слово: ' + errors.movie
                : errors.movie
            }
          </span>
        </form>
      </div>
      <div className='search__container'>
        <label className='checkbox'>
          <input
            type='checkbox'
            className='checkbox__input'
            checked={onlyShortFilms || false}
            onChange={handleSwitch}
          />
          <span className='checkbox__slider'></span>
        </label>
        <p className='search__text'>Короткометражки</p>
      </div>

    </section>
  );
}

export default SearchForm;