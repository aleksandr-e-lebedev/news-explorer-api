const USER_NAME_REQUIRED = 'Пожалуйста, укажите своё имя';
const USER_NAME_MIN_LENGTH = 'Имя должно содержать не менее 2 символов';
const USER_NAME_MAX_LENGTH = 'Имя должно содержать не более 30 символов';
const USER_EMAIL_REQUIRED = 'Пожалуйста, укажите Вашу электронную почту';
const USER_EMAIL_IS_EMAIL = 'Пожалуйста, предоставьте действительный адрес электронной почты';
const USER_PASSWORD_REQUIRED = 'Пожалуйста, введите пароль';
const USER_PASSWORD_MIN_LENGTH = 'Пароль должен содержать не менее 8 символов';
const USER_NOT_FOUND = 'Нет пользователя с таким id';

const ARTICLE_KEYWORD_REQUIRED = 'Статья должна содержать ключевое слово, по которому её нашли';
const ARTICLE_TITLE_REQUIRED = 'У статьи должен быть заголовок';
const ARTICLE_TEXT_REQUIRED = 'У статьи должен быть текст';
const ARTICLE_DATE_REQUIRED = 'У статьи должна быть дата';
const ARTICLE_SOURCE_REQUIRED = 'У статьи должен быть её источник';
const ARTICLE_LINK_REQUIRED = 'У статьи должна быть ссылка на неё';
const ARTICLE_LINK_IS_URL = 'Некорректный формат ссылки на статью';
const ARTICLE_IMAGE_REQUIRED = 'У статьи должна быть ссылка на иллюстрацию к ней';
const ARTICLE_IMAGE_IS_URL = 'Некорректный формат ссылки на иллюстрацию к статье';
const ARTICLE_NOT_FOUND = 'Нет статьи с таким id';
const ARTICLE_REMOVED = 'Статья удалена';

const TOO_MANY_REQUESTS = 'Слишком много запросов с этого IP. Пожалуйста, попробуйте снова через 15 минут';

const AUTH_REQUIRED = 'Вы не авторизованы. Пожалуйста, авторизуйтесь для получения доступа';
const INVALID_TOKEN = 'Недействительный токен. Пожалуйста, авторизуйтесь заново';
const EXPIRED_TOKEN = 'Срок действия токена истёк. Пожалуйста, авторизуйтесь заново';
const INVALID_EMAIL_OR_PASSWORD = 'Неправильные почта или пароль';
const NOT_ENOUGH_RIGHTS = 'Недостаточно прав';

const INVALID_REQUEST = 'Запрос сформирован неправильно';
const INVALID_INPUT_DATA = 'Предоставлены некорректные данные';
const DUPLICATE_FIELD_VALUE = 'Поле с таким значением уже существует. Пожалуйста, используйте другое значение';
const NOT_FOUND = 'Запрашиваемый ресурс не найден';
const SERVER_ERROR = 'Что-то пошло не так';

module.exports = {
  USER_NAME_REQUIRED,
  USER_NAME_MIN_LENGTH,
  USER_NAME_MAX_LENGTH,
  USER_EMAIL_REQUIRED,
  USER_EMAIL_IS_EMAIL,
  USER_PASSWORD_REQUIRED,
  USER_PASSWORD_MIN_LENGTH,
  USER_NOT_FOUND,

  ARTICLE_KEYWORD_REQUIRED,
  ARTICLE_TITLE_REQUIRED,
  ARTICLE_TEXT_REQUIRED,
  ARTICLE_DATE_REQUIRED,
  ARTICLE_SOURCE_REQUIRED,
  ARTICLE_LINK_REQUIRED,
  ARTICLE_LINK_IS_URL,
  ARTICLE_IMAGE_REQUIRED,
  ARTICLE_IMAGE_IS_URL,
  ARTICLE_NOT_FOUND,
  ARTICLE_REMOVED,

  TOO_MANY_REQUESTS,

  AUTH_REQUIRED,
  INVALID_TOKEN,
  EXPIRED_TOKEN,
  INVALID_EMAIL_OR_PASSWORD,
  NOT_ENOUGH_RIGHTS,

  INVALID_REQUEST,
  INVALID_INPUT_DATA,
  DUPLICATE_FIELD_VALUE,
  NOT_FOUND,
  SERVER_ERROR,
};
