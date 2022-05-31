import React from 'react';
import Button from './Button';
import Card from './Card';
import CurrentUserContext from '../contexts/CurrentUserContext';

function Main(props) {

    // Подписываемся на контекст CurrentUserContext
    const currentUser = React.useContext(CurrentUserContext);

    return (
        <>
            <section className="profile section content__section">
                Main section
                <Button title=""
                                btnClass="btn"
                                handleClick={props.handleEditProfileClick} />
            </section>

        </>
    );
}

export default Main;
