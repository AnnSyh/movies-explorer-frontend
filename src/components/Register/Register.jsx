import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Auth from '../Auth/Auth';
import { useForm, useFormWithValidation } from '../../hooks/useForm';


function Register({ handleRegister }) {

    const [message, setMessage] = useState('');

    // ----------------------------
    const [btnDisabled, setBtnDisabled] = useState(true);
    const { values, handleChangeInput, errors, isValid, resetForm } = useFormWithValidation()

    function handleSubmit(e) {
        e.preventDefault();
        handleRegister(values)
        //   .catch((e) => setMessage(e.message))
    }
    // ----------------------------

    return (
        <Auth title={'Добро пожаловать!'}
            ButtonText={'Зарегистрироваться'}
            btnDisabled={!isValid}
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
                    // pattern='[a-zA-Zа-яА-Я -]'

                    value={values.name || ""}
                    onChange={handleChangeInput}
                />
                <span className='auth__input-error'>{errors.name}</span>
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
                    minLength='2'
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
    )
}

export default Register;