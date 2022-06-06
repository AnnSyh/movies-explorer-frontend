import React from 'react';
// import CurrentUserContext from '../contexts/CurrentUserContext';
import './card.css';
import cardCheckSrc from "../../images/icon-check_active.svg";

function Card(props) {

    function handleCardClick() {
        props.handleCardClick();
    }
    function handleCardLike() {
        props.handleCardLike();
    }
    function handleCardDelete() {
        props.handleCardDelete();
    }

    // Подписываемся на контекст CurrentUserContext
    // const currentUser = React.useContext(CurrentUserContext);

    // Определяем, являемся ли мы владельцем текущей карточки
    // const isOwn = props.owner._id === currentUser._id;
    // Создаём переменную, которую после зададим в `className` для кнопки удаления
    // const cardDeleteButtonClassName = (
    //     `cards__trash ${isOwn ? '' : 'hidden'}`
    // );

    // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
    // const isLiked = props.likes.some(i => i._id === currentUser._id);
    // Создаём переменную, которую после зададим в `className` для кнопки лайка
    // const cardLikeButtonClassName = `cards__heart ${isLiked ? 'cards__heart_active' : ''}`;

    return (
        <li className="cards__item">
            <div className="cards__pic">
                <img className="cards__img"
                    data-popup="open-img__popup"
                    src={props.link}
                    alt={props.name}
                    onClick={handleCardClick}
                />
            </div>
            <div className="cards__text">
                <div className="cards__tex-row">
                    <div>
                        <h2 className="cards__title text-overflow">{props.name}</h2>

                    </div>
                    <img className="cards__check"
                            src={cardCheckSrc}
                            alt="короткометражка"
                        />
                </div>
                <div className="cards__tex-row">
                    <div className="cards__time">1ч42м</div>
                </div>
            </div>
        </li>
    );
}

export default Card;