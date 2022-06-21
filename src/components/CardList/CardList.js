import React from 'react';
import { useState, useCallback, useEffect } from 'react';
// import CurrentUserContext from '../contexts/CurrentUserContext';
import Card from '../../components/Card/Card';

function CardList(props) {

    console.log('CardList: props = ', props);
    console.log('CardList: props.moviesList = ', props.moviesList);
    

    const nothingFound = true;
    // const moviesList = [];
    const onSaveClick = false;
    const onDeleteClick = false;
    const savedMoviesList = [];
    const savedMoviesPage = false;

    const [showMovieList, setShowMovieList] = useState([]);
    const [cardsShowDetails, setCardsShowDetails] = useState({ total: 12, extra: 4 });
    
    const [isMount, setIsMount] = useState(true);
    const getScreenWidth = useCallback(() => window.innerWidth, []);
    const [screenWidth, setScreenWidth] = useState(getScreenWidth());
    const moviesCount = {
        decktop: { width: 1280, cards: { total: 12, extra: 4 } },
        tablet: { width: 768, cards: { total: 9, extra: 3 } },
        mobile: { width: 480, cards: { total: 5, extra: 2 } },
    }

    //получение текущего разрешения экрана пользователя
    useEffect(() => {
        function handleScreenResize() {
            setScreenWidth(getScreenWidth());
        };
        window.addEventListener('resize', resizeController, false);
        let resizeTimer;
        function resizeController() {
            if (!resizeTimer) {
                resizeTimer = setTimeout(() => {
                    resizeTimer = null;
                    handleScreenResize();
                }, 1000);
            }
        };
        return () => window.removeEventListener('resize', handleScreenResize);
    }, [getScreenWidth]);


    //отрисовка карточек при разных разрешениях
    useEffect(() => {
        if (screenWidth >= moviesCount.decktop.width) {
            console.log('cardsShowDetails decktop = ',cardsShowDetails);
            setCardsShowDetails(moviesCount.decktop.cards);
        } else if (screenWidth <= moviesCount.decktop.width && screenWidth > moviesCount.tablet.width) {
            console.log('cardsShowDetails  tablet = ',cardsShowDetails);
            setCardsShowDetails(moviesCount.tablet.cards);
        } else {
            console.log('cardsShowDetails mobile = ',cardsShowDetails);
            setCardsShowDetails(moviesCount.mobile.cards);
        }
        return () => setIsMount(false);
    }, [screenWidth, isMount]);
    // }, [screenWidth, isMount, moviesCount.decktop, moviesCount.tablet, moviesCount.mobile]);

    //отрисовка карточек при разных разрешениях
    useEffect(() => {
        if (props.moviesList.length) {
            const res = props.moviesList.filter((item, i) => i < cardsShowDetails.total);
            setShowMovieList(res);
        }
    }, [props.moviesList, savedMoviesPage, cardsShowDetails.total]);

    //отрисовка дополнительных фильмов по кнопке
    function handleClickMoreMovies() {

        console.log('handleClickMoreMovies');

        const start = showMovieList.length;
        const end = start + cardsShowDetails.extra;
        const additional = props.moviesList.length - start;

        if (additional > 0) {
            const newCards = props.moviesList.slice(start, end);
            setShowMovieList([...showMovieList, ...newCards]);
        }
    };

    //проверка сохранения фильма
    function getSavedMovieCard(savedMoviesList, movie) {
        return savedMoviesList.find(savedMovie => savedMovie.movieId === movie.id)
    };

    console.log('CardList: showMovieList = ', {showMovieList});


    return (
        <section className="movies__section">
            <>
                {
                    props.nothingFound ? <p className="movies__text-error">
                        Ничего не найдено</p> :
                        <>
                            <ul className='cards__list list-template-place'>
                                {/* {props.moviesList.map((card) => { */}
                                {showMovieList.map((card) => {
                                    return (
                                        <Card key={card.id || card._id} // для карточек с ресурса фильмов/mongo сервера
                                            handleSaveMovie={() => props.handleSaveMovie(card)}
                                            handleDeleteMovie={() => props.handleDeleteMovie(card)}

                                            savedMoviesPage={savedMoviesPage}

                                            pathname={props.pathname}

                                            {...card}
                                        />
                                    );
                                })
                                }
                            </ul>

                            {showMovieList.length >= 5 && showMovieList.length < props.moviesList.length ?
                                    <button 
                                            className='btn__else link'
                                            onClick={handleClickMoreMovies} >111Ещё</button>
                                : ''}
                                

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