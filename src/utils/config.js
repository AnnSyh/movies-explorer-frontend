const MAIN_API_URL = 'https://mesto.backend.annsyh.nomoredomains.work';
const BASE_URL = 'https://mesto.backend.annsyh.nomoredomains.work';
const MOVIES_URL = 'https://api.nomoreparties.co';

const ERROR_CODE_INTERNAL_DEL = 'При удалении фильма на сервере произошла ошибка, пожалуйста, обновите страницу и попробуйте еще раз';
const ERROR_CODE_INTERNAL_ADD = 'При добавлении фильма на сервере произошла ошибка, пожалуйста, обновите страницу и попробуйте еще раз';
const ERROR_409 = 'Пользователь с таким email уже существует.';
const ERROR_401 = 'Неправильные почта или пароль.';
const ERROR_TOO_MANY_REGUESTS = 'Too many requests';
const ERROR_CODE_NOT_FOUND = 'Карточка фильма с указанным _id не найдена.';
const ERROR_CODE_BAD_REQUEST = 'При добавлении фильма на сервере произошла ошибка, пожалуйста, обновите страницу и попробуйте еще раз';

const DEVICE_WIDTH = {
  desktop: { width: 1280, cards: { total: 12, extra: 4 } },
  tablet: { width: 768, cards: { total: 9, extra: 3 } },
  mobile: { width: 480, cards: { total: 4, extra: 2 } },
};

const MOVIEDURATION = 40;

module.exports = {
  MAIN_API_URL,
  BASE_URL,
  MOVIES_URL,
  ERROR_CODE_INTERNAL_DEL,
  ERROR_CODE_INTERNAL_ADD,
  DEVICE_WIDTH,
  ERROR_409,
  ERROR_401,
  ERROR_TOO_MANY_REGUESTS,
  ERROR_CODE_NOT_FOUND,
  ERROR_CODE_BAD_REQUEST,
  MOVIEDURATION
}