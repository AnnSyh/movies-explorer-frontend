import React from 'react';
import Button from '../Button/Button';
import Card from '../Card/Card';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import CurrentUserContext from '../../contexts/CurrentUserContext';


const cards = [
    {
        "id": 1,
        "nameRU": "«Роллинг Стоунз» в изгнании",
        "nameEN": "Stones in Exile",
        "director": "Стивен Кайак ",
        "country": "США",
        "year": "2010",
        "duration": 61,
        "description": "В конце 1960-х группа «Роллинг Стоунз», несмотря на все свои мегахиты и сверхуспешные концертные туры, была разорена. Виной всему — бездарный менеджмент и драконовское налогообложение в Британии. Тогда музыканты приняли не самое простое для себя решение: летом 1971 года после выхода альбома «Stiсky Fingers» они отправились на юг Франции записывать новую пластинку. Именно там, на Лазурном Берегу, в арендованном Китом Ричардсом подвале виллы Неллькот родился сборник «Exile on Main St.», который стал лучшим альбомом легендарной группы.",
        "trailerLink": "https://www.youtube.com/watch?v=UXcqcdYABFw",
        "created_at": "2020-11-23T14:12:21.376Z",
        "updated_at": "2020-11-23T14:12:21.376Z",
        "image": {
            "id": 1,
            "name": "stones-in-exile",
            "alternativeText": "",
            "caption": "",
            "width": 512,
            "height": 279,
            "formats": {
                "thumbnail": {
                    "hash": "thumbnail_stones_in_exile_b2f1b8f4b7",
                    "ext": ".jpeg",
                    "mime": "image/jpeg",
                    "width": 245,
                    "height": 134,
                    "size": 8.79,
                    "path": null,
                    "url": "/uploads/thumbnail_stones_in_exile_b2f1b8f4b7.jpeg"
                },
                "small": {
                    "hash": "small_stones_in_exile_b2f1b8f4b7",
                    "ext": ".jpeg",
                    "mime": "image/jpeg",
                    "width": 500,
                    "height": 272,
                    "size": 25.68,
                    "path": null,
                    "url": "/uploads/small_stones_in_exile_b2f1b8f4b7.jpeg"
                }
            },
            "hash": "stones_in_exile_b2f1b8f4b7",
            "ext": ".jpeg",
            "mime": "image/jpeg",
            "size": 25.53,
            "url": "/uploads/stones_in_exile_b2f1b8f4b7.jpeg",
            "previewUrl": null,
            "provider": "local",
            "provider_metadata": null,
            "created_at": "2020-11-23T14:11:57.313Z",
            "updated_at": "2020-11-23T14:11:57.313Z"
        }
    },
    {
        "id": 2,
        "nameRU": "All Tomorrow's Parties",
        "nameEN": "All Tomorrow's Parties",
        "director": " Джонатан Кауэтт",
        "country": "Великобритания",
        "year": "2009",
        "duration": 82,
        "description": "Хроники британского фестиваля, который первым нарушил монополию «Гластонбери», «Ридинга» и прочих пивных сборищ в чистом поле — и с тех пор прослыл одним из самых независимых и принципиальных. ATP из года в год проходит на базе отдыха в английской глуши, где артисты и их поклонники живут в одинаковых номерах, не бывает коммерческих спонсоров, программу составляют приглашенные кураторы (в разное время ими были Ник Кейв, Belle & Sebastian, Sonic Youth и даже Мэтт Грейнинг). И, главное, где не любят вздорных людей — основатель фестиваля Барри Хоган однажды сказал, что никогда больше не станет иметь дело с группой Killing Joke, «потому что они му...аки». Эта демократичность сказалась и на фильме: часть съемок сделана адептами фестиваля на мобильный телефон.",
        "trailerLink": "https://www.youtube.com/watch?v=D5fBhbEJxEU",
        "created_at": "2020-11-23T14:15:19.238Z",
        "updated_at": "2020-11-23T14:15:19.238Z",
        "image": {
            "id": 2,
            "name": "all-tommoros-parties",
            "alternativeText": "",
            "caption": "",
            "width": 699,
            "height": 266,
            "formats": {
                "thumbnail": {
                    "hash": "thumbnail_all_tommoros_parties_33a125248d",
                    "ext": ".jpeg",
                    "mime": "image/jpeg",
                    "width": 245,
                    "height": 93,
                    "size": 10.33,
                    "path": null,
                    "url": "/uploads/thumbnail_all_tommoros_parties_33a125248d.jpeg"
                },
                "small": {
                    "hash": "small_all_tommoros_parties_33a125248d",
                    "ext": ".jpeg",
                    "mime": "image/jpeg",
                    "width": 500,
                    "height": 190,
                    "size": 35.24,
                    "path": null,
                    "url": "/uploads/small_all_tommoros_parties_33a125248d.jpeg"
                }
            },
            "hash": "all_tommoros_parties_33a125248d",
            "ext": ".jpeg",
            "mime": "image/jpeg",
            "size": 67.06,
            "url": "/uploads/all_tommoros_parties_33a125248d.jpeg",
            "previewUrl": null,
            "provider": "local",
            "provider_metadata": null,
            "created_at": "2020-11-23T14:14:08.595Z",
            "updated_at": "2020-11-23T14:14:08.595Z"
        }
    }, 

]


function Movies(props) {
    // console.log('Movies props= ',props);
  

    // Подписываемся на контекст CurrentUserContext
    const currentUser = React.useContext(CurrentUserContext);

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
                                    <Card key={card.id}
                                        // handleCardClick={() => props.handleCardClick(card)}
                                        // handleCardLike={() => props.handleCardLike(card)}
                                        // handleCardDelete={() => props.handleCardDelete(card)}
                                        {...card}
                                    />
                                );
                            })}
                        </ul>

                        <Preloader />

                        <button
                            className='btn__else link'
                        // onClick={handleCardElse}
                        >Еще</button>


                    </div>
                </section>
            </div>
        </div>
    );
}

export default Movies;
