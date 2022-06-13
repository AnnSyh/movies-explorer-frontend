// import React from 'react';
import React, { useCallback, useEffect } from "react";
import { useParams, useHistory } from 'react-router-dom';
import './profile.css';
import '../Link/link.css';
import { useState } from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext';

function Profile(props) {

    console.log('props = ', props);

    const history = useHistory();
    const currentUser = React.useContext(CurrentUserContext); // Подписываемся на контекст CurrentUserContext

    // console.log('currentUser = ', currentUser);

    const [isEditModeOn, setIsEditModeOn] = useState(false);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [formValid, setFormValid] = useState(false);

//передаем введенный в поля текст
useEffect(() => {
    setName(currentUser.name || '');
    setEmail(currentUser.email || '');
}, [currentUser]);

function handleSubmit(evt) {
    evt.preventDefault(evt);
    props.onUpdateUser({
        name: name,
        email: email
    });
};




// валидация полей формы
    const [nameDirty, setNameDirty] = useState(false);
    const [emailDirty, setEmailDirty] = useState(false);
    const [nameError, setNameError] = useState('поле name не должно бытьпустым');
    const [emailError, setEmailError] = useState('поле email не должно бытьпустым');

    const blurHandler = (e) =>{
        // eslint-disable-next-line default-case
        switch(e.target.name){
          case 'name':
            setNameDirty(true);
            break
          case 'email':
            setEmailDirty(true);
            break
        }
      }

      const nameHandler = (e) =>{
        setName(e.target.value)
        const re = /^[a-zA-Zа-яА-Я]+$/ui;
        if (!re.test(String(e.target.value).toLowerCase())){
          setNameError('Не корректное имя')
          console.log('nameError = ',nameError)
        } else {
          setNameError('')
          console.log('nameError = ',nameError)
        }
      }

      const emailHandler = (e) =>{
        setEmail(e.target.value)
        const re = /^[0-9a-zA-Z_\\-\\]+@[0-9a-zA-Z_\\-\\]+\.[a-zA-Z]+$/ui;
        if (!re.test(String(e.target.value).toLowerCase())){
          setEmailError('Не корректный емайл')
          console.log('emailError = ',emailError)
        } else {
          setEmailError('')
          console.log('emailError = ',emailError)
        }
      }

      useEffect(() =>{

        if(!nameError && !emailError){
            setFormValid(false)
            console.log('formValid = ',formValid)
        } else {

            setFormValid(true)
            console.log('formValid = ',formValid)
        }

      },[nameError,emailError]);



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
                                // className={`profile__btn link ${!formValid}`}
                                className={
                                    formValid
                                    ? 'profile__btn link'
                                    : 'profile__btn link profile__btn-valid'
                                }
                                disabled={formValid}
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
    }
    // function handleSubmitButtonClick(e) {
    //     e.preventDefault();
    //     if (!(name === currentUser.name) || !(email === currentUser.email)) {
    //         onUpdateUser(name, email);
    //         setIsEditModeOn(false);
    //     } else if (name === currentUser.name) {
    //         setShowNameInputError(true);
    //     } else if (email === currentUser.email) {
    //         setShowEmailInputError(true);
    //     }
    // }

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
                        // noValidate
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
                                    value={name|| ''}
                                    // value={`${currentUser.name}`}
                                    disabled={!isEditModeOn}
                                    onBlur={e => blurHandler(e)}
                                    onChange={e => {
                                        nameHandler(e)
                                      }}
                                />
                            </label>
                            {(nameDirty && nameError) && <div className="profile__error">{nameError}</div>}

                            <label className='profile__label'>
                                <p className='profile__input-title'>Почта</p>
                                <input
                                    className='profile__input'
                                    type='email'
                                    required
                                    name='email'
                                    autoComplete='on'
                                    minLength='2'
                                    value={email|| ''}
                                    // value={`${currentUser.email}`}
                                    disabled={!isEditModeOn}
                                    onBlur={e => blurHandler(e)}
                                    onChange={e => {
                                        emailHandler(e)
                                      }}
                                />
                            </label>
                            {(emailDirty && emailError) && <div className="profile__error">{emailError}</div>}
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