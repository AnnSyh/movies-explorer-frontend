import React from 'react';
import { useState } from 'react';
// import CurrentUserContext from '../contexts/CurrentUserContext';
import './card.css';

function Card(props) {

    // console.log('Card: props = ', props);
    // console.log('Card: props.country = ', props.country);
    // console.log('Card: props.director = ', props.director);
    // console.log('Card: props.duration = ', props.duration);
    // console.log('Card: props.year = ', props.year);
    // console.log('Card: props.description = ', props.description);
    // console.log('Card: props.image = ', props.image);
    // console.log('Card: props.trailerLink = ', props.trailerLink);
    // console.log('Card: props.thumbnail = ', props.thumbnail);
    // console.log('Card: props.nameRU = ', props.nameRU);
    // console.log('Card: props.nameEN = ', props.nameEN);
    // console.log('Card: props.savedCard = ', props.savedCard);
    // console.log('Card: props.handleSaveMovie = ', props.handleSaveMovie);

    const [isLiked, setIsLiked] = useState(false);


    function handleButtonClickDelete(card){
        console.log('handleButtonClickDelete');
    }

    function handleCheckboxClick(){
        setIsLiked(!isLiked);
        props.handleSaveMovie(
                                // props.country, 
                                // props.director, 
                                // props.duration, 
                                // props.year, 
                                // props.description, 
                                // props.image, 
                                // props.trailerLink, 
                                // props.thumbnail,
                                // props.movieId, 
                                // props.nameRU, 
                                // props.nameEN
                            ) //добавление фильма в сохраненные (в базу mongodb)
    }

    // function handleCardDelete() {
    //     props.handleCardDelete();
    // }
    // Подписываемся на контекст CurrentUserContext
    // const currentUser = React.useContext(CurrentUserContext);
    // Определяем, являемся ли мы владельцем текущей карточки
    // const isOwn = false;
    // Создаём переменную, которую после зададим в `className` для кнопки удаления
    // const cardDeleteButtonClassName = (
    //     `cards__trash ${isOwn ? '' : 'hidden'}`
    // );

    return (
        <li className='cards__item'>
            <div className='cards__pic'>
                <a className="link" href={props.trailerLink}>
                    <img className='cards__img'
                        data-popup='open-img__popup'
                        src={'https://api.nomoreparties.co' + props.image.formats.thumbnail.url}
                        alt={props.nameRU}
                    />
                </a>    
            </div>
            <div className='cards__text'>
                <div className='cards__tex-row'>
                    <h2 className='cards__title text-overflow'>{props.nameRU}</h2>

                    {props.savedCard 
                    ? (
                        <button 
                            onClick={handleButtonClickDelete} 
                            className='cards__trash'
                        ></button>

                    ) : (
                        <label className="checkbox checkbox_img">
                            <span 
                                className={
                                    !isLiked
                                        ? 'checkbox__slider'
                                        : 'checkbox__slider checkbox__slider_green'
                                }
                                onClick={handleCheckboxClick} 
                                ></span>
                        </label>
                    )}

                </div>
                <div className='cards__tex-row'>
                    <div className='cards__time'>{props.duration}</div>
                </div>
            </div>
        </li>
    );
}

export default Card;