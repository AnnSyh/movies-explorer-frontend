import React from 'react';
import { useState } from 'react';
import './card.css';

function Card(props) {

    // console.log('Card:  props= ', props );
    console.log('Card:  props.showCardList= ', props.showCardList );
    // console.log('Card:  props.saved = ', props.saved );


    //cохранение фильма в базу mongodb
    function handleSaveClick() {
        props.handleSaveMovie()
    }

    // удаление фильма из базы mongodb
    function handleTrashClick() {
        props.handleDeleteMovie()
    }

    //форматирование времени
    function getMovieDuration(mins) {
        return `${Math.floor(mins / 60)}ч ${mins % 60}м`;
    }

    //выделение выбранного пользователем фильма
    function handleCheckboxClick() {
        if (props.saved) {
            // if (false) {
            // if(true){
            console.log('if удаление фильма из базы mongodb')

            // props.handleDeleteMovie(); // удаляется из массива и локалсториджа 
            handleTrashClick(); // удаляется из массива и локалсториджа 
            localStorage.setItem('saved', !props.saved); // нужно для смены класса чекбокса

        } else {
            localStorage.setItem('saved', !props.saved); // нужно для смены класса чекбокса
            // props.saved = localStorage.getItem('saved', !props.saved);

            console.log('else добавление фильма в базу mongodb')

            // props.handleSaveMovie();// добавляется в массив и локалсторидж 
            handleSaveClick();// добавляется в массив и локалсторидж 
        }
        // // запомним лайкнутую карточку
        // localStorage.setItem('saved', saved);
    }

    const label = (
        <label className="checkbox checkbox_img" >
            <span
                className={
                    // !saved
                    props.saved
                        ?  `${localStorage.getItem("saved")} checkbox__slider checkbox__slider_card checkbox__slider_green`
                        :   `${localStorage.getItem("saved")} checkbox__slider checkbox__slider_card`
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
                    <div className='cards__time'>{getMovieDuration(props.duration)}</div>
                </div>
            </div>
        </li>
    );
}

export default Card;