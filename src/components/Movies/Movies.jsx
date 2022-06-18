import React from 'react';
import { useState, useEffect } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import CardList from '../CardList/CardList';
import moviesApi from "../../utils/MoviesApi";
import CurrentUserContext from '../../contexts/CurrentUserContext';



function Movies(props) {
    // console.log('Movies props= ', props);
    // console.log('Movies props.setFilteredMovies= ', props.setFilteredMovies);

    // Подписываемся на контекст CurrentUserContext
    const currentUser = React.useContext(CurrentUserContext);

    const [shortMovies, setShortMovies] = useState(false);
    const [inputValue, setInputValue] = useState(false);
    const [filteredMovies, setFilteredMovies] = useState([]);
    const [initialMovies, setInitialMovies] = useState([])
    const [nothingFound, setNothingFound] = useState(true);
    const [isDataLoading, setIsDataLoading] = useState(false);
    const [isError, setIsError] = useState(false);



    // ------------functions-----------------
    //фильтр по ключевому слову
    function filterMovies(movies, request, shortMoviesCheckbox) {
        const moviesByRequest = movies.filter((movie) => {
            return movie.nameRU.toLowerCase().includes(request.toLowerCase())
        });

        if (shortMoviesCheckbox) {
            return filterShortMovies(moviesByRequest);
        } else {
            return moviesByRequest;
        }
    };

    //фильтр по длительности
    function filterShortMovies(movies) {
        return movies.filter((movie) => movie.duration <= 40);
    };

    //поиск фильмов по ключевому слову и длительности
    function handleSetFilteredMovies(movies, request, shortMoviesCheckbox) {
        const moviesList = filterMovies(movies, request, shortMoviesCheckbox);
        moviesList.length === 0 ? setNothingFound(true) : setNothingFound(false);
        setInitialMovies(moviesList);
        setFilteredMovies(shortMoviesCheckbox ? filterShortMovies(moviesList) : moviesList);
        localStorage.setItem('movies', JSON.stringify(moviesList));
    }

    // сабмит формы поиска
    function handleSearchSubmit(inputValue) {
        setIsDataLoading(true);
        localStorage.setItem('movieSearch', inputValue);
        localStorage.setItem('shortMovies', shortMovies);
        moviesApi
            .getAllMovies()
            .then((data) => {
                handleSetFilteredMovies(data, inputValue, shortMovies);
            })
            .catch((err) => {
                setIsError(true);
                console.log(err);
            })
            .finally(() => setIsDataLoading(false));
    }

    // установка чекбокса
    function handleShortFilms() {
        setShortMovies(!shortMovies);
        if (!shortMovies) {
            if (filterShortMovies(initialMovies).length === 0) {
                setFilteredMovies(filterShortMovies(initialMovies));
                setNothingFound(true);
            } else {
                setFilteredMovies(filterShortMovies(initialMovies));
                setNothingFound(false);
            }
        } else {
            initialMovies.length === 0 ? setNothingFound(true) : setNothingFound(false);
            setFilteredMovies(initialMovies);
        }
        // запомним выбранный чекбокс
        localStorage.setItem('shortMovies', !shortMovies);
    }

    //кнопка more
    function handleCardElse(){
        console.log('handleCardElse');
    }

    //-------------useEffects-----------------------------------

    //состояние инпута в локальном хранилище
    useEffect(() => {
        if (localStorage.getItem('movieSearch')) {
            setInputValue(localStorage.getItem('movieSearch'));
        }
    }, []);

    //состояние тумблера в локальном хранилище
    useEffect(() => {
        if (localStorage.getItem('shortMovies') === "true") {
            setShortMovies(true);
        } else {
            setShortMovies(false);
        }
    }, [currentUser]);

    //отображение карточек из локального хранилища
    useEffect(() => {
        if (localStorage.getItem('movies')) {
            const movies = JSON.parse(localStorage.getItem('movies'));
            movies.length === 0 ? setNothingFound(true) : setNothingFound(false)
            setInitialMovies(movies);
            if (localStorage.getItem('shortMovies') === "true") {
                setFilteredMovies(filterShortMovies(movies));
            } else {
                setFilteredMovies(movies);
            }
        } else {
            setNothingFound(true)
        }
    }, [currentUser]);


    return (
        <div className='movies'>
            <div className='container movies__container'>
                <section className='search section content__section'>
                    <SearchForm
                        handleSearchSubmit={handleSearchSubmit}
                        setFilteredMovies={props.setFilteredMovies}
                        isLoading={props.isLoading}

                        checkBoxClick={handleShortFilms}
                        inputValue={inputValue}
                        shortMovies={shortMovies}
                    />
                </section>



                <section className='section content__section'>
                    <div className='list-template-inner'>

                        {
                            isDataLoading ? <Preloader /> :

                                <>
                                    {isError ?
                                        <span id="movies__error" className="movies__text-error">
                                            Во время запроса произошла ошибка. Возможно, проблема с соединением или
                                            сервер недоступен. Подождите немного и попробуйте ещё раз
                                        </span>
                                        :
                                        <>
                                            <CardList
                                                nothingFound={nothingFound}
                                                moviesList={filteredMovies}

                                                handleSaveMovie={props.handleSaveMovie}
                                                handleDeleteMovie={props.handleDeleteMovie}
                                                

                                                // onSaveClick={onSaveClick}
                                                // onDeleteClick={onDeleteClick}
                                                // savedMoviesList={savedMoviesList}

                                                savedMoviesPage={false}
                                            >
                                            </CardList>

                                            {/* <ul className='cards__list list-template-place'>
                                                {props.cards.map((card) => {
                                                    return (
                                                        <Card key={card.id} // для карточек с ресурса фильмов
                                                            // handleCardClick={() => props.handleCardClick(card)}
                                                            handleSaveMovie={() => props.handleSaveMovie(card)}
                                                            handleDeleteMovie={() => props.handleDeleteMovie(card)}

                                                            // handleCardLike={() => props.handleCardLike(card)}
                                                            {...card}
                                                            savedCard={props.savedCard}
                                                        />
                                                    );
                                                })
                                                }
                                            </ul> */}
                                            <button
                                                className='btn__else link'
                                            onClick={handleCardElse}
                                            >Еще</button>

                                        </>
                                    }
                                </>
                        }






                    </div>
                </section>
            </div>
        </div>
    );
}

export default Movies;
