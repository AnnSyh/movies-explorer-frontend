import React from 'react';
// import CurrentUserContext from '../contexts/CurrentUserContext';
import './card.css';
import cardCheckSrc from '../../images/icon-check_active.svg';
import imgCrossSrc from '../../images/icon-cross.svg';

function Card(props) {

    // console.log('Card: props = ', props);

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
                <img className='cards__img'
                    data-popup='open-img__popup'
                    src={'https://api.nomoreparties.co' + props.image.formats.thumbnail.url}
                    alt={props.nameRU}
                />
            </div>
            <div className='cards__text'>
                <div className='cards__tex-row'>
                    <h2 className='cards__title text-overflow'>{props.nameRU}</h2>

                    {props.savedCard ? (

                        <button className='cards__trash'></button>

                    ) : (
                        <label className="checkbox checkbox_img"><span className="checkbox__slider"></span></label>
                        // <label className="checkbox checkbox_img"><span className="checkbox__slider checkbox__slider_green"></span></label>
                        // <img className='cards__check'
                        //     src={cardCheckSrc}
                        //     alt='короткометражка'
                        // />
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