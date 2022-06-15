import React from 'react';
import { useState } from 'react';
import Card from '../Card/Card';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import CurrentUserContext from '../../contexts/CurrentUserContext';


function Movies(props) {
    console.log('Movies props= ', props);


    // Подписываемся на контекст CurrentUserContext
    const currentUser = React.useContext(CurrentUserContext);

    //результаты поиска
    // const [serchRezalt, setSerchRezalt] = useState(false);
    const [serchRezalt, setSerchRezalt] = useState(true);

    // console.log('serchRezalt = ', serchRezalt);
    // console.log('setSerchRezalt = ', setSerchRezalt);

    return (
        <div className='movies'>
            <div className='container movies__container'>
                <section className='search section content__section'>
                    <SearchForm />
                </section>



                <section className='section content__section'>
                    <div className='list-template-inner'>

                        {/* //прописываю условие если не было поиска то и результатов нет */}
                        {serchRezalt
                            ?
                            <>
                                <p>результаты поиска есть</p>

                                {/* <Preloader /> */}
                                <ul className='cards__list list-template-place'>
                                    {props.cards.map((card) => {
                                        return (
                                            <Card key={card.id}
                                                // handleCardClick={() => props.handleCardClick(card)}
                                                handleSaveMovie={() => props.handleSaveMovie(card)}
                                                handleCardLike={() => props.handleCardLike(card)}
                                                {...card}
                                            />
                                        );
                                    })}
                                </ul>

                                <button
                                    className='btn__else link'
                                // onClick={handleCardElse}
                                >Еще</button>

                            </>
                            :
                            <>
                                <p>
                                    результатов поиска нет<br/>
                                    Введите ключевое слово<br/>
                                    в форму поиска 

                                </p>
                            </>
                        }


                        



                    </div>
                </section>
            </div>
        </div>
    );
}

export default Movies;
