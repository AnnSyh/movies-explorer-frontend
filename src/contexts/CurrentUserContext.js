import React from 'react';

const CurrentUserContext = React.createContext();

// умолчальные данные
const currentUser = {
    name: 'Имя пользователя',
    about: 'О пользователе',
}; 

// console.log('Provider value = ',CurrentUserContext.value)
// console.log('currentUser = ',currentUser)

export default CurrentUserContext;