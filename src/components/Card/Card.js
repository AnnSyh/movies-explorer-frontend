import React from 'react';
import { useState } from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import './card.css';

function Card(props) {

    // Подписываемся на контекст CurrentUserContext
    const currentUser = React.useContext(CurrentUserContext);
    
    // const [location, setLocation] = useState('/');

    // console.log('Card: props = ', props);
    // console.log('Card: props.pathname = ', props.pathname);
    // console.log('Card: ? props.image = ', props.image);
    // console.log('Card: ? props.image = ', 'https://api.nomoreparties.co' + props.image.url);
    // console.log('Card: : "https://api.nomoreparties.co" + props.image.formats.thumbnail.url = ', 'https://api.nomoreparties.co' + props.image.formats.thumbnail.url);


    const [saved, setSaved] = useState(false);

    const [savedMovies, setSavedMovies] = useState({});

    // удаление фильма из базы mongodb
    function handleTrashClick() {
        props.handleDeleteMovie()
    }

//выделение выбранного пользователем фильма
    function handleCheckboxClick() {
        if (saved) {
            // if (false) {
            // if(true){
            console.log('if удаление фильма из базы mongodb')

            localStorage.setItem('saved', false); // нужно для смены класса чекбокса
            console.log('localStorage.getItem(saved) = ', localStorage.getItem('saved'))

            props.handleDeleteMovie(); // удаляется из массива и локалсториджа 
            setSaved(!saved);

        } else {
            console.log('else добавление фильма в базу mongodb')
            localStorage.setItem('saved', true); // нужно для смены класса чекбокса
            console.log('localStorage.getItem(saved) = ', localStorage.getItem('saved'))

            props.handleSaveMovie();// добавляется в массив и локалсторидж 
            setSaved(!saved);
        }
        // // запомним лайкнутую карточку
        // localStorage.setItem('saved', saved);
    }

    //-------------useEffects-----------------------------------
    // состояние карточки  лайкнутые/нет
    // useEffect(() => {
    //     if (localStorage.getItem('saved') === 'true') {
    //         setSaved(true);
    //     } else {
    //         setSaved(false);
    //     }
    // }, [currentUser]);

    const label = (
        <label className="checkbox checkbox_img" >
            <span
                className={
                    // !saved
                    !localStorage.getItem('saved')
                        ? `${localStorage.getItem("saved")} checkbox__slider checkbox__slider_card`
                        : `${localStorage.getItem("saved")} checkbox__slider checkbox__slider_card checkbox__slider_green`
                }
                onClick={handleCheckboxClick}
            ></span>
        </label >
    )

    const cross = (
        <>
            <button 
                className="cards__trash" 
                onClick={handleTrashClick}
            ></button>
        </>
    )



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

                    {
                        props.pathname === '/saved-movies'
                            ? cross
                            : label
                    }
                </div>
                <div className='cards__tex-row'>
                    <div className='cards__time'>{props.duration}</div>
                </div>
            </div>
        </li>
    );
}

export default Card;