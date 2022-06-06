import React from 'react';

import Promo from '../Promo/Promo';
import AboutProject from '../AboutProject/AboutProject';
import Technology from '../Technology/Technology';
import Student from '../Student/Student';


function Main() {
    return (
        <>
            <main className="content container">
                <Promo />
                <AboutProject />
                <Technology />
                <Student />
            </main>
        </>
    );
}

export default Main;
