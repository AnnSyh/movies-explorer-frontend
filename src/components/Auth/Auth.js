import Button from '../Button/Button';
import { Link } from 'react-router-dom';
import logoSrc from '../../images/logo.svg';
import './auth.css';
import '../Link/link.css';
import useFormWithValidation  from '../../hooks/useForm'; // валидация формы




function Auth(props) {


  return (
    <div className='auth'>
      <header className='auth__header'>
        <Link to='/'>
          <img
            className='logo'
            src={logoSrc}
            alt='логотип'
          />
        </Link>
      </header>
      <main className='auth__content'>
        <h1 className='auth__title'>{props.title}</h1>
        <form 
          noValidate
          className={props.authFormStyle}
          onSubmit={props.onSubmit}

        >
          <fieldset className='auth__fieldset'>
            {props.children}
          </fieldset>
          <div className='auth__wrapper'>
            <p className='auth__error'>
               {props.message}
            </p>
            <Button 
              title={props.ButtonText}
              btnClass={ props.btnDisabled
                ? 'auth__btn auth__btn_disabled'
                : 'auth__btn link'
              }
              btnDisabled={props.btnDisabled}
            />
            {props.caption}
          </div>
        </form>
      </main>
    </div>
  )
}

export default Auth;