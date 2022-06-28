const BASE_URL = 'https://mesto.backend.annsyh.nomoredomains.work';
const MOVIES_URL = 'https://api.nomoreparties.co';

const ERROR_CODE_INTERNAL_DEL = 'При удалении фильма на сервере произошла ошибка, пожалуйста, обновите страницу и попробуйте еще раз';
const ERROR_CODE_INTERNAL_ADD = 'При добавлении фильма на сервере произошла ошибка, пожалуйста, обновите страницу и попробуйте еще раз';

const DEVICE_WIDTH = {
  desktop: { width: 1280, cards: { total: 12, extra: 4 } },
  tablet: { width: 768, cards: { total: 9, extra: 3 } },
  mobile: { width: 480, cards: { total: 4, extra: 2 } },
};

module.exports = {
  BASE_URL,
  MOVIES_URL,
  ERROR_CODE_INTERNAL_DEL,
  ERROR_CODE_INTERNAL_ADD,
  DEVICE_WIDTH
}