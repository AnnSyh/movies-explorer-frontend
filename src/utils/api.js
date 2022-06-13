class Api {
  constructor({serverUrl}) {
      this._serverUrl = serverUrl;
  }

  _checkResult(res) {
      if (res.ok) {
          return res.json();
      } else {
          return Promise.reject(`Ошибка: ${res.status}`);
      }
  }
  
}

export default Api;
