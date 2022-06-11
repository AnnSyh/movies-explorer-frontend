import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Auth from '../Auth/Auth';

function Login({ handleLogin }) {
    const [userData, setUserState] = useState({
        password: '',
        email: '',
        // password: 'dsfsdfsdfsdf',
        // email: 'bbb@email.ru',
    });

    const [message, setMessage] = useState('')
    const { email, password } = userData

    function handleChange(e) {
        const { name, value } = e.target;
        setUserState({
            ...userData,
            [name]: value
        });
    }

    function handleSubmit(e) {
        e.preventDefault();
        console.log('Login.jsx: handleSubmit');
        handleLogin(email, password)
    }

    return (
        <>
            <p className="auth__error">
               {message}
            </p>

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
                        value={email} 
                        onChange={handleChange} 
                    />
                    <span className='auth__input-error' />
                </label>
                <label className='auth__label'>
                    <p className='auth__label-text'>Пароль</p>
                    <input
                        className='auth__input'
                        type='password'
                        minLength='5'
                        maxLength='12'
                        required
                        name='password'
                        autoComplete='on'
                        placeholder='Пароль'
                        value={password}
                        onChange={handleChange} 
                    />
                    <span className='auth__input-error' />
                </label>
            </Auth>
        </>
    )
}

export default Login;