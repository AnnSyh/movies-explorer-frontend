import React from 'react';
import { useState } from 'react';
// import CurrentUserContext from '../contexts/CurrentUserContext';
import Card from '../../components/Card/Card';

function CardList(props) {

    // console.log('CardList: props = ', props);

    const [showMovieList, setShowMovieList] = React.useState([]);
    const [cardsShowDetails, setCardsShowDetails] = React.useState({ total: 12, extra: 3 });
    const [isMount, setIsMount] = React.useState(true);
    const getScreenWidth = React.useCallback(() => window.innerWidth, []);
    const [screenWidth, setScreenWidth] = React.useState(getScreenWidth());
    const moviesCount = {
        large: { width: 1280, cards: { total: 12, extra: 3 } },
        medium: { width: 768, cards: { total: 8, extra: 2 } },
        small: { width: 480, cards: { total: 5, extra: 2 } },
    }


    return (
        <section className="movies__section">
            <>
                {
                    props.nothingFound ? <p className="movies__text-error">
                        Ничего не найдено</p> :
                        <>
                            <ul className='cards__list list-template-place'>
                                {props.moviesList.map((card) => {
                                    return (
                                        <Card key={card.id || card._id} // для карточек с ресурса фильмов/mongo сервера
                                            handleSaveMovie={() => props.handleSaveMovie(card)}
                                            handleDeleteMovie={() => props.handleDeleteMovie(card)}

                                            pathname={props.pathname}

                                            {...card}
                                        />
                                    );
                                })
                                }
                            </ul>
                            {/* <ul className="cards__list list-template-place">
                                {showMovieList.map((movie) => (
                                    <Card
                                        // saved={getSavedMovieCard(savedMoviesList, movie)}
                                        key={movie.id || movie._id}
                                        movie={movie}
                                        // onSaveClick={onSaveClick}
                                        // onDeleteClick={onDeleteClick}
                                        // savedMoviesPage={savedMoviesPage}
                                    />
                                ))}
                            </ul> */}

                        </>
                }
            </>
        </section>
    );
};

export default CardList;