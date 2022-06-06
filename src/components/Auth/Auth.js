import Button from "../Button/Button";
import { Link } from "react-router-dom";
import logoSrc from "../../images/logo.svg";
import './auth.css';
import '../Link/link.css';

function Auth({title, ButtonText, children, caption, authFormStyle}) {
  return (
    <div className="auth">
      <header className="auth__header">
        <Link to="/">
          <img 
            className="logo" 
            src={logoSrc} 
            alt="логотип" 
          />
        </Link>
      </header>
      <main className="auth__content">
        <h1 className="auth__title">{title}</h1>
        <form className={authFormStyle} >
          <fieldset className="auth__fieldset">
            {children}
          </fieldset>
          <div className="auth__wrapper">
            <Button title={ButtonText}
                    btnClass="auth__btn link"
            />
            {caption}
          </div>
        </form>
      </main>
    </div>
  )
}

export default Auth;