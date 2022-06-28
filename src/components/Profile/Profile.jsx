// import React from 'react';
import React, { useEffect } from "react";
import { useState } from 'react';
import './profile.css';
import '../Link/link.css';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import { useFormWithValidation } from '../../hooks/useForm';

function Profile(props) {

    // console.log('Profile props = ',props);

    const currentUser = React.useContext(CurrentUserContext); // Подписываемся на контекст CurrentUserContext

    const [isEditModeOn, setIsEditModeOn] = useState(false);
    const [isUpdateUser, setIsUpdateUser] = useState(false);
    // ----------------------------
    const { values, handleChangeInput, errors, isValid, resetForm } = useFormWithValidation()  // хук валидации полей формы

    const [name, setName] = useState(currentUser.name);
    const [previousName, setPreviousName] = useState(currentUser.name);
    const [email, setEmail] = useState(currentUser.email);
    const [previousEmail, setPreviousEmail] = useState(currentUser.email);
    const [isActiveButton, setIsActiveButton] = useState(false); //для активности кнопки Сохранить

    function handleEditButton() {
        setIsEditModeOn(true);
    }

    function handleSubmitButtonClick(e) {
        e.preventDefault();
        setIsEditModeOn(false);

        if (isValid) {
            console.log('handleSubmitButtonClick: isValid = ', isValid);
            props.onUpdateUser(values);
            setIsUpdateUser(true);
        }
    }

    //ввод данных, сверка со старыми
    function handleUserName(evt) {
        const value = evt.target.value;
        setName(value);
        if (value !== previousName) {
            setIsActiveButton(true);
        } else {
            setIsActiveButton(false);
        }
    }

    //ввод данных, сверка со старыми
    function handleUserEmail(evt) {
        const value = evt.target.value;
        setEmail(value);
        if (value !== previousEmail) {
            setIsActiveButton(true);
        } else {
            setIsActiveButton(false);
        }
    }

    //передаем введенный в поля текст
    useEffect(() => {
        if (currentUser) {
            resetForm(currentUser, {}, true)
        }
    }, [currentUser, resetForm]);

    const requirementValidity = (!isValid || (currentUser.name === values.name && currentUser.email === values.email));

    // console.log('111 !requirementValidity= ',!requirementValidity);
    // console.log('222 изменения input.name = ',currentUser.name === values.name);
    // console.log('222 изменения input.email = ',currentUser.email === values.email);


    const profileLinks = <>

        <button onClick={handleEditButton}
            type='submit'
            // className='profile__link'
            className='profile__link link profile__link-edit'
            // disabled={isValid}
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
            {props.setMessage}
        </span>

        <button onClick={handleEditButton}
            type='submit'
            className={
                requirementValidity
                    ? `profile__btn`
                    : `profile__btn link profile__btn-valid`
            }
            disabled={requirementValidity}
        >Сохранить
        </button>
    </>

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
                                    onChange={handleChangeInput || handleUserName}
                                    pattern="^[A-Za-zА-Яа-яЁё /s -]+$"
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
                                    onChange={handleChangeInput || handleUserEmail}
                                />
                            </label>
                            <span className='profile__error'>{errors.email || ''}</span>
                        </fieldset>

                        <div className='profile__links'>
                            <p className={
                                isUpdateUser && !isEditModeOn
                                    ? 'profile__message '
                                    : 'profile__message profile__message_disabled'
                            }
                            >Данные успешно изменены<br />
                                {errors.name}  {errors.email}
                            </p>
                            {isEditModeOn ? profileButton : profileLinks}
                        </div>
                    </form>
                </main>
            </div>
        </>
    )
}

export default Profile;