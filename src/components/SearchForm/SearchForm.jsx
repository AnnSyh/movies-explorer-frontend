import React from "react";
import './search-form.css';
import { useForm, useFormWithValidation } from '../../hooks/useForm';

function SearchForm() {

  // ----------------------------
  const { values, handleChangeInput, errors, isValid, resetForm } = useFormWithValidation()  // хук валидации полей формы


  function handleSubmitForm(e) {
    e.preventDefault();
    console.log('handleSubmitForm');

    if (isValid) {
      console.log('handleSubmitForm: isValid = ', isValid);
      // props.onUpdateUser(values);  
    } else {
      console.log('handleSubmitForm: errors.name = ', errors.name);
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
            minLength='5'
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
          <span className='search__error'>{errors.movie}</span>
        </form>
      </div>
      <div className='search__container'>
        <label className='checkbox'>
          <input type='checkbox' className='checkbox__input' />
          <span className='checkbox__slider'></span>
        </label>
        <p className='search__text'>Короткометражки</p>
      </div>

    </section>
  );
}

export default SearchForm;