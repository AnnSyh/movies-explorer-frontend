// SavedMovies
import React from 'react';
import { useState } from 'react';
import Card from '../Card/Card';
import SearchForm from '../SearchForm/SearchForm';// тот-же что и на Movies.jsx
import CurrentUserContext from '../../contexts/CurrentUserContext';


function SavedMovies(props) {
    console.log('Movies props= ', props);


    // Подписываемся на контекст CurrentUserContext
    const currentUser = React.useContext(CurrentUserContext);

    //результаты поиска
    const [serchRezalt, setSerchRezalt] = useState(false);
    const [savedCard, setSavedCard] = useState(true);//отвечает за крестик на карточке

    console.log('serchRezalt = ', serchRezalt);
    console.log('setSerchRezalt = ', setSerchRezalt);

    return (
        <div className='movies'>
            <div className='container movies__container'>

                <p>Сохраненные фильмы</p>

                <section className='search section content__section'>
                    <SearchForm />
                </section>

                <section className='section content__section'>
                    <div className='list-template-inner'>

                        <ul className='cards__list list-template-place'>
                            {props.cards.map((card) => {
                                return (
                                    <Card key={card.id}
                                        handleCardClick={() => props.handleCardClick(card)}
                                        handleCardDelete={() => props.handleCardDelete(card)}
                                        {...card}
                                        // savedCard={false}
                                        // savedCard={true}
                                        savedCard={savedCard}
                                    />
                                );
                            })}
                        </ul>

                    </div>
                </section>
            </div>
        </div>
    );
}

export default SavedMovies;
