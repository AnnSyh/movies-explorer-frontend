import React from 'react';
import { useState, useCallback, useEffect } from 'react';
// import CurrentUserContext from '../contexts/CurrentUserContext';
import Card from '../../components/Card/Card';
import { DEVICE_WIDTH } from "../../utils/config";

function CardList(props) {
    // console.log('! CardList: props = ', props);

    const [showMovieList, setShowMovieList] = useState([]);
    const savedMoviesPage = false;
    const [cardsShowDetails, setCardsShowDetails] = useState({ total: 12, extra: 4 });
    const [isMount, setIsMount] = useState(true);
    const getScreenWidth = useCallback(() => window.innerWidth, []);
    const [screenWidth, setScreenWidth] = useState(getScreenWidth());
    const moviesCount = DEVICE_WIDTH;

    // получение текущего разрешения экрана пользователя
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


    // отрисовка карточек при разных разрешениях
    useEffect(() => {
        if (screenWidth >= moviesCount.desktop.width) {
            setCardsShowDetails(moviesCount.desktop.cards);
        } else if (screenWidth <= moviesCount.desktop.width && screenWidth > moviesCount.tablet.width) {
            setCardsShowDetails(moviesCount.tablet.cards);
        } else {
            setCardsShowDetails(moviesCount.mobile.cards);
        }
        return () => setIsMount(false);
    }, [screenWidth, isMount]);
    // }, [screenWidth, isMount, moviesCount.desktop, moviesCount.tablet, moviesCount.mobile]);

    // отрисовка карточек при разных разрешениях
    useEffect(() => {
        if (props.moviesList.length) {
            const res = props.moviesList.filter((item, i) => i < cardsShowDetails.total);
            setShowMovieList(res);
        }
    }, [props.moviesList, savedMoviesPage, cardsShowDetails.total]);

    // отрисовка дополнительных фильмов при клике по кнопке
    function handleClickMoreCards() {

        const start = showMovieList.length;
        const end = start + cardsShowDetails.extra;
        const additional = props.moviesList.length - start;

        if (additional > 0) {
            const newCards = props.moviesList.slice(start, end);
            setShowMovieList([...showMovieList, ...newCards]);
        }
    };

    // проверка обьекта на пустоту 
    function isEmpty(obj) {
        for (var key in obj) {
            return false;
        }
        return true;
    }

    // проверка сохранения фильма
    function getSavedMovieCard(savedMovies, movie) {
        const isEmptyConst = isEmpty(savedMovies);
        if (!isEmptyConst) {
            return savedMovies.find(m => m.movieId === movie.id)
        }
    };


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

                                            saved={getSavedMovieCard(props.savedMovies, card)}

                                            pathname={props.pathname}
                                            {...card}
                                        />
                                    );
                                })
                                }
                            </ul>

                            {showMovieList.length >= 4 && showMovieList.length < props.moviesList.length ?
                                <button
                                    className='btn__else link'
                                    onClick={handleClickMoreCards} >Ещё</button>
                                : ''}

                        </>
                }
            </>
        </section>
    );
};

export default CardList;