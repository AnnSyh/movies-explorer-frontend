import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../Auth/Auth';

function Login ({ handleLogin }) {


    function handleSubmit(e) {
        e.preventDefault();
        console.log('!!! handleSubmit');
        handleLogin()
    }

    return (
        <>
            {/* <p className="auth__error">
               {message}
            </p> */}

            <Auth title={'Рады видеть!'}
                ButtonText={'Войти'}
                caption={<p className='auth__text'>Ещё не зарегистрированы?&nbsp;
                    <Link className='auth__link' to='/signup'>Регистрация</Link>
                </p>}
                authFormStyle={'auth__form auth__form-login'}
                onSubmit={handleSubmit}
            >
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
                    <span className='auth__input-error' />
                </label>
                <label className='auth__label'>
                    <p className='auth__label-text'>Пароль</p>
                    <input
                        className='auth__input'
                        type='password'
                        minLength='6'
                        maxLength='12'
                        required
                        name='password'
                        autoComplete='on'
                        placeholder='Пароль'
                    />
                    <span className='auth__input-error' />
                </label>
            </Auth>
        </>
    )
}

export default Login;