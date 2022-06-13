// import React from 'react';
import React, { useCallback, useEffect } from "react";
import { useParams, useHistory } from 'react-router-dom';
import './profile.css';
import '../Link/link.css';
import { useState } from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import { useForm, useFormWithValidation } from '../../hooks/useForm';

function Profile(props) {

    // console.log('props = ', props);

    const history = useHistory();
    const currentUser = React.useContext(CurrentUserContext); // Подписываемся на контекст CurrentUserContext

    // console.log('currentUser = ', currentUser);

    const [isEditModeOn, setIsEditModeOn] = useState(false);

    // ----------------------------
    const [btnDisabled, setBtnDisabled] = useState(true);
    const { values, handleChangeInput, errors, isValid, resetForm } = useFormWithValidation()  // хук валидации полей формы

    //передаем введенный в поля текст
    useEffect(() => {
        if (currentUser) {
            resetForm(currentUser, {}, true)
        }
    }, [currentUser, resetForm]);

    function handleSubmit(evt) {
        evt.preventDefault(evt);
        props.onUpdateUser(values);
    };

    // валидация полей формы
    //     const re = /^[a-zA-Zа-яА-Я]+$/ui;
    //     const re = /^[0-9a-zA-Z_\\-\\]+@[0-9a-zA-Z_\\-\\]+\.[a-zA-Z]+$/ui;

    const profileLinks = <>
        <button onClick={handleEditButton}
            type='submit'
            className='profile__link link profile__link-edit'
        >
            Редактировать
        </button>
        <div onClick={props.signOut}
            className='link profile__link  profile__link_exit'>
            Выйти из аккаунта
        </div>
    </>
    const profileButton = <>
        <span className='profile__error'>
            При обновлении профиля произошла ошибка.
        </span>

        <button onClick={handleEditButton}
            type='submit'
            className={
                !isValid
                    ? 'profile__btn'
                    : 'profile__btn link profile__btn-valid'
            }
            disabled={!isValid}
        >Сохранить
        </button>
    </>

    function handleEditButton() {
        setIsEditModeOn(true);
    }

    function handleSubmitButtonClick(e) {
        console.log('handleSubmitButtonClick');
        e.preventDefault();
        setIsEditModeOn(false);

        if(isValid){

            console.log('handleSubmitButtonClick: isValid = ', isValid);
            
            props.onUpdateUser(values);  
        }

    }


    return (
        <>
            <div className="auth profile__wrapper">
                <main className='profile'>
                    <h1 className='profile__title'>Привет, {`${currentUser.name}`}!</h1>

                    <form
                        className={
                            isEditModeOn
                                ? 'profile__form'
                                : 'profile__form profile__form_disabled'
                        }
                        onSubmit={handleSubmitButtonClick}
                        // onSubmit={handleSubmit}
                        noValidate
                    >
                        <fieldset className='profile__fieldset'>
                            <label className='profile__label'>
                                <p className='profile__input-title'>1Имя</p>
                                <input
                                    className='profile__input'
                                    type='text'
                                    required
                                    name='name'
                                    autoComplete='on'
                                    minLength='2'
                                    maxLength='15'
                                    value={values.name || ''}
                                    disabled={!isEditModeOn}
                                    onChange={handleChangeInput}
                                />
                            </label>
                            <span className='profile__error'>{errors.name}</span>

                            <label className='profile__label'>
                                <p className='profile__input-title'>Почта</p>
                                <input
                                    className='profile__input'
                                    type='email'
                                    required
                                    name='email'
                                    autoComplete='on'
                                    minLength='2'
                                    value={values.email || ''}
                                    disabled={!isEditModeOn}
                                    onChange={handleChangeInput}
                                />
                            </label>
                            <span className='profile__error'>{errors.email}</span>
                        </fieldset>

                        <div className='profile__links'>
                            {isEditModeOn ? profileButton : profileLinks}
                        </div>
                    </form>
                </main>
            </div>
        </>
    )
}

export default Profile;