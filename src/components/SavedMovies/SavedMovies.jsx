import React from 'react';
import Card from '../Card/Card';
import SearchForm from '../SearchForm/SearchForm';
// import CurrentUserContext from '../contexts/CurrentUserContext';

const cards = [
  {
    '_id': '62909117e1f65b00121c7c97',
    'name': '33 слова одизайне',
    'link': 'https://zastavok.net/main/priroda/163639453162.jpg',
    'owner': {
        'name': 'Jacques',
        'about': 'Sailor, researcher7',
        'avatar': 'https://zastavok.net/main/priroda/163639453162.jpg',
        '_id': '00f20e076ee09b4849e185b9',
        'cohort': 'cohort-34'
    },
    'createdAt': '2022-05-27T08:51:35.361Z'
},
{
    '_id': '628fff349f428e0012dd8b82',
    'name': '33 слова одизайне 44 33 слова одизайне 44 33 слова одизайне 44 33 слова одизайне 44',
    'link': 'https://w-dog.ru/wallpapers/9/17/322057789001671/zakat-nebo-solnce-luchi-oblaka-tuchi-pole-kolosya-zelenye-trava.jpg',
    'owner': {
        'name': 'Jacques',
        'about': 'Sailor, researcher7',
        'avatar': 'https://zastavok.net/main/priroda/163639453162.jpg',
        '_id': '00f20e076ee09b4849e185b9',
        'cohort': 'cohort-34'
    },
    'createdAt': '2022-05-26T22:29:08.300Z'
},
{
    '_id': '628e1740ec36660040a0aa99',
    'name': '33 слова одизайне 66',
    'link': 'https://funik.ru/wp-content/uploads/2018/10/17478da42271207e1d86.jpg',
    'owner': {
        'name': 'Жак-Ив Куст',
        'about': 'gj',
        'avatar': 'https://images.pexels.com/photos/2023384/pexels-photo-2023384.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
        '_id': '90e2d279b3a4720cb3be767f',
        'cohort': 'cohort-34'
    },
    'createdAt': '2022-05-25T11:47:12.615Z'
}
]

function SavedMovies(props) {
// console.log('Main props= ',props);
    // Подписываемся на контекст CurrentUserContext
    // const currentUser = React.useContext(CurrentUserContext);

    return (
        <div className='movies'>
            <div className='container movies__container'>
                <section className='search section content__section'>
                    <SearchForm />
                </section>

                <section className='cards1 section content__section '>
                    <div className='list-template-inner'>
                        <ul className='cards__list list-template-place'>
                            {cards.map((card) => {
                                return (
                                    <Card key={card._id}
                                        // handleCardDelete={() => props.handleCardDelete(card)}
                                        {...card}
                                        savedCard={true}
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
