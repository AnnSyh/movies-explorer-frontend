import React from 'react';
import { useState, useEffect } from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import './card.css';

function Card(props) {

    const [location, setLocation] = useState('/');

    // console.log('Card: props = ', props);
    // console.log('Card: props.pathname = ', props.pathname);
    // console.log('Card: ? props.image = ', props.image);
    // console.log('Card: ? props.image = ', 'https://api.nomoreparties.co' + props.image.url);
    // console.log('Card: : "https://api.nomoreparties.co" + props.image.formats.thumbnail.url = ', 'https://api.nomoreparties.co' + props.image.formats.thumbnail.url);

    // Подписываемся на контекст CurrentUserContext
    const currentUser = React.useContext(CurrentUserContext);

    const [saved, setSaved] = useState(false);
    
    const [savedMovies, setSavedMovies] = useState({});

    


    function handleCheckboxClick() {
        setSaved(!saved);

        if (saved) {
        // if (false) {
        // if(true){
            console.log('if удаление фильма из базы mongodb')
            console.log('saved = ', saved)
            localStorage.setItem('saved2', false  );
            console.log('localStorage.getItem(saved2) = ', localStorage.getItem('saved2'))

            props.handleDeleteMovie()
        } else {
            console.log('else добавление фильма в базу mongodb')
            console.log('saved = ', saved)
            localStorage.setItem('saved2', true );
            console.log('localStorage.getItem(saved2) = ', localStorage.getItem('saved2'))

            props.handleSaveMovie()
        }
        // // запомним лайкнутую карточку
        // localStorage.setItem('saved', saved);
    }

    //-------------useEffects-----------------------------------
    // состояние карточки  лайкнутые/нет
    // useEffect(() => {
    //     if (localStorage.getItem('saved2') === 'true') {
    //         setSaved(true);
    //     } else {
    //         setSaved(false);
    //     }
    // }, [currentUser]);



    return (
        <li className='cards__item'>
            <div className='cards__pic'>
                <a className="link" href={props.trailerLink}>

                    <img className='cards__img'
                        src={
                            props.pathname === '/saved-movies'
                            ? props.image 
                            : 'https://api.nomoreparties.co' + props.image.formats.thumbnail.url
                        }
                        alt={props.nameRU}
                    />
                </a>
            </div>
            <div className='cards__text'>
                <div className='cards__tex-row'>
                    <h2 className='cards__title text-overflow'>{props.nameRU}</h2>
                    <label className="checkbox checkbox_img">
                        <span
                            className={
                                // !saved
                                !localStorage.getItem('saved2')
                                    ? `${localStorage.getItem("saved2")} checkbox__slider checkbox__slider_card`
                                    : `${localStorage.getItem("saved2")} checkbox__slider checkbox__slider_card checkbox__slider_green`
                            }
                            onClick={handleCheckboxClick}
                        ></span>
                    </label>
                </div>
                <div className='cards__tex-row'>
                    <div className='cards__time'>{props.duration}</div>
                </div>
            </div>
        </li>
    );
}

export default Card;