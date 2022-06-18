import React from 'react';
import { useState, useEffect } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import CardList from '../CardList/CardList';
import CurrentUserContext from '../../contexts/CurrentUserContext';



function SavedMovies(props) {
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

    //поиск среди сохраненных фильмов
      function handleSearchSubmit(inputValue) {
        localStorage.setItem('savedMoviesSearch', inputValue);
        // if(filterMovies(savedMoviesList, inputValue, shortMovies).length === 0) {
        //   setNothingFound(true)
        // } else {
        //   setNothingFound(false)
        //   setFilteredMovies(filterMovies(savedMoviesList, inputValue, shortMovies))
        //   setShowedMovies(filterMovies(savedMoviesList, inputValue, shortMovies))
        //   localStorage.setItem('savedMovies', JSON.stringify(savedMoviesList));
        // }
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
        
        if (localStorage.getItem('savedMovies')) {
            const movies = JSON.parse(localStorage.getItem('savedMovies'));
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
                        <CardList
                            nothingFound={nothingFound}
                            moviesList={filteredMovies}
                            pathname={props.pathname}

                            handleSaveMovie={props.handleSaveMovie}
                            handleDeleteMovie={props.handleDeleteMovie}
                        >
                        </CardList>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default SavedMovies;
