export const BASE_URL = 'https://mesto.backend.annsyh.nomoredomains.work';

const handleResponse = response => {
if (response.ok) { 
  return response.json();
}

return Promise.reject(`Ошибка ${response.status}`);
};

//Функция регистрация пользователя
export const register = (values) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(values)
  })
  .then(handleResponse);
};

//Функция авторизация пользователя
export const authorize = (values) => {
  console.log('!!! authorize');
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(values)
  })
  .then(handleResponse);
};

export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization" : `Bearer ${token}`
    }
  })
    .then(handleResponse)
}

export const getContent = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization" : `Bearer ${token}`
    }
  })
  .then(res => res.json())
  .then(data => data)
}