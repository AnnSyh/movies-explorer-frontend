export const BASE_URL = 'https://mesto.backend.annsyh.nomoredomains.work';

const handleResponse = response => {
  const result = response.json();
  const status = response.status;

  console.log('result = ',result)
  console.log('status = ',status)

if (response.ok) { 
  return result;
}
return Promise.reject(response.status);
};


  // // проверка статуса запроса
  // async _requestResult(res) {
  //   const result = await res.json();
  //   return res.ok ? result : Promise.reject(result.message);
  // }



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
  .then(res => handleResponse(res));
  // .then(res => res.json())
  // .then(handleResponse);
};

//Функция авторизация пользователя
export const authorize = (values) => {
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