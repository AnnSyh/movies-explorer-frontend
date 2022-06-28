import React from "react";
import { useState, useEffect, useContext } from 'react';
import './search-form.css';
import {useFormWithValidation } from '../../hooks/useForm';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import { useLocation } from 'react-router-dom';

function SearchForm(props) {

  const currentUser = useContext(CurrentUserContext);
  const location = useLocation();

  const [error, setError] = useState('');
  // ----------------------------
  const { values, handleChangeInput, isValid, setIsValid} = useFormWithValidation()  // хук валидации полей формы

  function clearError() {
    setError(null);
  }


  function handleSubmitForm(e) {
    e.preventDefault();
    isValid  ? props.handleSearchSubmit(values.movie) : setError('Нужно ввести ключевое слово.');
  }

  useEffect(() => {
    setError('')
  }, [isValid]);

    //состояние инпута из локального хранилища
    useEffect(() => {
      if (location.pathname === '/movies' && localStorage.getItem(`movieSearch`)) {
        const searchValue = localStorage.getItem(`movieSearch`);
        values.movie = searchValue;
        // setIsValid(true);
      }
    }, [currentUser]);


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
            value={values.movie || ''}
            onChange={handleChangeInput}
            required
          />
            <span className='search__error'>
              {error}
              </span>
          <button
            type='submit'
            className='search__button link search__button-valid'
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