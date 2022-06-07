import Header from '../Header/Header';
import Button from '../Button/Button';
import { Link } from 'react-router-dom';
import './profile.css';
import '../Link/link.css';
import {useState} from 'react';

function Profile() {

  const [isEditModeOn, setIsEditModeOn] = useState(false);

  function handleEditButton() {
      setIsEditModeOn(true);
  }

  function handleSubmitButtonClick(e) {
      e.preventDefault();
      setIsEditModeOn(false);
  }

  const profileLinks = <><button  onClick={handleEditButton} 
                                  type='button'
                                  className='profile__link profile__link-edit'>Редактировать</button>
      <Link to='/' type='button' className='profile__link  profile__link_exit'>Выйти из аккаунта</Link>
  </>


  const profileButton = <><span className='profile__error'>При обновлении профиля произошла ошибка.</span>
      <Button  title={'Сохранить'}
               btnClass='profile__btn link' />
  </>

  return (
    <>
       <div class="auth profile__wrapper">
            <main className='profile'>
                <h1 className='profile__title'>Привет, Виталий!</h1>
                <form 
                className='profile__form' 
                onSubmit={handleSubmitButtonClick} 
                >
                    <fieldset className='profile__fieldset'>
                        <label className='profile__label'>
                            <p className='profile__input-title'>Имя</p>
                            <input
                                className='profile__input'
                                type='text'
                                required
                                name='name'
                                autoComplete='on'
                                minLength='2'
                                maxLength='15'
                                // value='Виталий'
                                disabled={!isEditModeOn}
                            />
                        </label>
                        <label className='profile__label'>
                            <p className='profile__input-title'>Почта</p>
                            <input
                                className='profile__input'
                                type='email'
                                required
                                name='email'
                                autoComplete='on'
                                minLength='2'
                                // value='pochta@yandex.ru'
                                disabled={!isEditModeOn}
                            />
                        </label>
                    </fieldset>

                    <div className='profile__links'>
                        {isEditModeOn ? profileButton : profileLinks}
                    </div>
                </form>
            </main>
       </div>
    </>
)
}

export default Profile;