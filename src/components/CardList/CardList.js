import React from 'react';
import { useState, useCallback, useEffect } from 'react';
// import CurrentUserContext from '../contexts/CurrentUserContext';
import Card from '../../components/Card/Card';

function CardList(props) {

    console.log('CardList: props = ', props);
    // console.log('CardList: props.savedMovies.movies = ', props.savedMovies.movies);
    // console.log('CardList: props.moviesList = ', props.moviesList);


    const onSaveClick = false;  //переключатель чекбокса карточки (на дододелать)
    const savedMoviesPage = false;

    const [showCardList, setshowCardList] = useState([]);
    const [cardsShowDetails, setCardsShowDetails] = useState({ total: 12, extra: 4 });

    const [isMount, setIsMount] = useState(true);
    const getScreenWidth = useCallback(() => window.innerWidth, []);
    const [screenWidth, setScreenWidth] = useState(getScreenWidth());
    const moviesCount = {
        desktop: { width: 1280, cards: { total: 12, extra: 4 } },
        tablet: { width: 768, cards: { total: 9, extra: 3 } },
        mobile: { width: 480, cards: { total: 4, extra: 2 } },
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
        if (screenWidth >= moviesCount.desktop.width) {
            // console.log('cardsShowDetails desktop = ', cardsShowDetails);
            setCardsShowDetails(moviesCount.desktop.cards);
        } else if (screenWidth <= moviesCount.desktop.width && screenWidth > moviesCount.tablet.width) {
            // console.log('cardsShowDetails  tablet = ', cardsShowDetails);
            setCardsShowDetails(moviesCount.tablet.cards);
        } else {
            // console.log('cardsShowDetails mobile = ', cardsShowDetails);
            setCardsShowDetails(moviesCount.mobile.cards);
        }
        return () => setIsMount(false);
    }, [screenWidth, isMount]);
    // }, [screenWidth, isMount, moviesCount.desktop, moviesCount.tablet, moviesCount.mobile]);

    //отрисовка карточек при разных разрешениях
    useEffect(() => {
        if (props.moviesList.length) {
            const res = props.moviesList.filter((item, i) => i < cardsShowDetails.total);
            setshowCardList(res);
        }
    }, [props.moviesList, savedMoviesPage, cardsShowDetails.total]);

    //отрисовка дополнительных фильмов при клике по кнопке
    function handleClickMoreCards() {

        const start = showCardList.length;
        const end = start + cardsShowDetails.extra;
        const additional = props.moviesList.length - start;

        if (additional > 0) {
            const newCards = props.moviesList.slice(start, end);
            setshowCardList([...showCardList, ...newCards]);
        }
    };

    //проверка обьекта на пустоту 
    function isEmpty(obj) {
        for(var key in obj)
        {
            return false;
        }
        return true;
    }

    //проверка сохранения фильма
    function getSavedMovieCard(savedMovies, movie) {

        const condition = isEmpty(savedMovies);

        // if (savedMovies !== {}) {
        if (!condition) {

            // console.log('getSavedMovieCard: return', savedMovies.find(m => m.movieId === movie.id));

            return savedMovies.find(m => m.movieId === movie.id)
        }

    };

    // console.log('CardList: showCardList = ', { showCardList });


    return (
        <section className="movies__section">
            <>
                {
                    props.nothingFound ? <p className="movies__text-error">
                        Ничего не найдено</p> :
                        <>
                            <ul className='cards__list list-template-place'>
                                {/* {props.moviesList.map((card) => { */}
                                {showCardList.map((card) => {
                                    return (
                                        <Card key={card.id || card._id} // для карточек с ресурса фильмов/mongo сервера
                                            handleSaveMovie={() => props.handleSaveMovie(card)}
                                            handleDeleteMovie={() => props.handleDeleteMovie(card)}

                                            savedMoviesPage={savedMoviesPage}

                                            // saved={
                                            //     // props.savedMovies
                                            //     !isEmpty(props.savedMovies)
                                            //         ? getSavedMovieCard(props.savedMovies, card)
                                            //         : false
                                            // }


                                            saved= {false}

                                pathname={props.pathname}

                                {...card}
                                        />
                                );
                                })
                                }
                            </ul>

                            {showCardList.length >= 4 && showCardList.length < props.moviesList.length ?
                                <button
                                    className='btn__else link'
                                    onClick={handleClickMoreCards} >Ещё</button>
                                : ''}


                            {/* <ul className="cards__list list-template-place">
                                {showCardList.map((movie) => (
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