import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Auth from '../Auth/Auth';
import { useForm, useFormWithValidation } from '../../hooks/useForm';


function Login({ handleLogin }) {
    // const [userData, setUserState] = useState({
    //     password: '',
    //     email: '',
    //     // password: 'dsfsdfsdfsdf',
    //     // email: 'bbb@email.ru',
    // });

    const [message, setMessage] = useState('')
    // const { email, password } = userData

    // function handleChange(e) {
    //     const { name, value } = e.target;
    //     setUserState({
    //         ...userData,
    //         [name]: value
    //     });
    // }

    // ----------------------------
    const [btnDisabled, setBtnDisabled] = useState(true);
    const { values, handleChangeInput, errors, isValid, resetForm } = useFormWithValidation()


    function handleSubmit(e) {
        e.preventDefault();
        console.log('Login.jsx: handleSubmit');
        // handleLogin(email, password)
        handleLogin(values)
    }

    return (
        <>
            <p className="auth__error">
                {message}
            </p>

            <Auth title={'Рады видеть!'}
                ButtonText={'Войти'}
                btnDisabled={!isValid}
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
                        value={values.email || ""}
                        onChange={handleChangeInput}
                    />
                    <span className='auth__input-error'>{errors.email}</span>
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
                        value={values.password || ""}
                        onChange={handleChangeInput}
                    />
                    <span className='auth__input-error'>{errors.password}</span>
                </label>
            </Auth>
        </>
    )
}

export default Login;