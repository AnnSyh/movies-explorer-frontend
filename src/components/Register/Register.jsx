import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../Auth/Auth';


function Register({ handleRegister }) {

    function handleSubmit(e) {
        e.preventDefault();
        console.log('!!! handleSubmit');
        handleRegister()
    }

  return (
      <Auth title={'Добро пожаловать!'} 
            ButtonText={'Зарегистрироваться'}
            caption={<p className='auth__text'>Уже зарегистрированы?&nbsp;
                        <Link className='auth__link' to='/signin'>Войти</Link>
                    </p>}
            authFormStyle={'auth__form auth__form-register'}
            onSubmit={handleSubmit}
      >
          <label className='auth__label'>
              <p className='auth__label-text'>Имя</p>
              <input
                  className='auth__input'
                  type='text'
                  required
                  name='name'
                  autoComplete='on'
                  minLength='2'
                  maxLength='15'
                  placeholder='Имя'
              />
              <span className='auth__input-error' />
          </label>
          <label className='auth__label'>
              <p className='auth__label-text'>E-mail</p>
              <input
                  className='auth__input'
                  type='email'
                  required
                  name='email'
                  autoComplete='on'
                  placeholder='E-mail'
              />
              <span className='auth__input-error'/>
          </label>
          <label className='auth__label'>
              <p className='auth__label-text'>Пароль</p>
              <input
                  className='auth__input'
                  type='password'
                  minLength='2'
                  maxLength='12'
                  required
                  name='password'
                  autoComplete='on'
                  placeholder='Пароль'
              />
              <span className='auth__input-error'>Что-то пошло не так...</span>
          </label>
      </Auth>
  )
}

export default Register;
