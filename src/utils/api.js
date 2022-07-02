class Api {
  constructor({serverUrl}) {
      this._serverUrl = serverUrl;
  }

  _checkResult(res) {
      if (res.ok) {
          return res.json();
      } else {
          return Promise.reject(`Ошибка: ${res.status}`);
        //   return Promise.reject(`При удалении фильма на сервере произошла ошибка, пожалуйста, обновите страницу и попробуйте еще раз`);
      }
  }
  
}

export default Api;
