// import React from 'react';
import React, { useCallback, useEffect } from "react";
import { useState } from 'react';
import './profile.css';
import '../Link/link.css';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import { useForm, useFormWithValidation } from '../../hooks/useForm';

function Profile(props) {
    // console.log('props = ', props);
    const currentUser = React.useContext(CurrentUserContext); // Подписываемся на контекст CurrentUserContext
    // console.log('currentUser = ', currentUser);
    const [isEditModeOn, setIsEditModeOn] = useState(false);
    // ----------------------------
    const { values, handleChangeInput, errors, isValid, resetForm } = useFormWithValidation()  // хук валидации полей формы
    //передаем введенный в поля текст
    useEffect(() => {
        if (currentUser) {
            resetForm(currentUser, {}, true)
        }
    }, [currentUser, resetForm]);

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
                        noValidate
                    >
                        <fieldset className='profile__fieldset'>
                            <label className='profile__label'>
                                <p className='profile__input-title'>Имя</p>
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