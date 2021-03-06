# NewsExplorer API

Версия: v1.0.0

## Описание

Данный проект является выпускной квалификационной работой и реализован в рамках учебной программы [Яндекс.Практикум](https://praktikum.yandex.ru) по профессии веб-разработчик для подтверждения следующих навыков:

1. работа с базами данных;
2. обеспечение безопасности сервера;
3. разворачивание бэкенда на удалённой машине.

Цель проекта — создать сервер с API и аутентификацией для сервиса NewsExplorer, в котором можно найти новости по запросу и сохранить в личном кабинете.

## Используемые технологии

1. JavaScript,
2. Node.js,
3. Express,
4. MongoDB,
5. Git.

## Демо

API: [https://api.news-app.gq](https://api.news-app.gq)

IP-адрес сервера: 84.201.174.130

## Функциональные возможности

### Предисловие

Обозначения в запросах:

1. `PORT` - это `3000` порт для режима `development` или номер порта, указанный в конфигурационном файле `.env`, для режима `production`;

2. `:articleId` - это идентификатор статьи, значение поля `_id` в объекте статьи, например, `5d1f0611d321eb4bdcd707dd`.

3. `{jwt}` - токен доступа к ресурсам сервера, созданный по стандарту [JSON Web Token (JWT)](https://tools.ietf.org/html/rfc7519), сроком на 7 дней.

Во всех запросах, где необходимо передавать в теле запроса JSON-объект, в заголовках запроса указывайте `'Content-Type': 'application/json'`.

Во всех запросах, кроме запросов по маршрутам `POST /signup` и `POST /signin`, в заголовках запроса указывайте `'Authorization': 'Bearer {jwt}'`.

### I. Аутентификация и авторизация

#### 1. Регистрация пользователя

Сделайте запрос вида:

`POST http://localhost:PORT/signup`

В теле запроса передайте JSON-объект следующего вида:

```
{
  "name": "User one name",
  "email": "user-one-email@example.com",
  "password": "user-one-password"
}
```

Требования к полям передаваемого JSON-объекта:

* **name**: строка; от 2 до 30 символов; обязательное поле;
* **email**: строка, содержащая email пользователя; обязательное поле;
* **password**: строка; не менее 8 символов; обязательное поле.

Если запрос прошёл успешно, в ответе Вы получите JSON-объект с созданным пользователем следующего вида:

Status: `201 Created`

```
{
  "status": "success",
  "data": {
    "user": {
      "_id": "e20537ed11237f86bbb20ccb",
      "name": "User one name",
      "email": "user-one-email@example.com"
    }
  }
}
```

Примечание:

* пароль пользователя хранится в базе данных в зашифрованном виде.

#### 2. Авторизация

Сделайте запрос вида:

`POST http://localhost:PORT/signin`

В теле запроса передайте JSON-объект следующего вида:

```
{
  "email": "user-one-email@example.com",
  "password": "user-one-password"
}
```

Требования к полям передаваемого JSON-объекта:

* **email**: строка, содержащая email пользователя; обязательное поле;
* **password**: строка; не менее 8 символов; обязательное поле.

Если запрос прошёл успешно, в ответе Вы получите JSON-объект c токеном доступа к ресурсам сервера и ранее созданным пользователем следующего вида:

Status: `200 OK`

```
{
  "status": "success",
  "token": "{jwt}",
  "data": {
    "user": {
      "_id": "e20537ed11237f86bbb20ccb",
      "name": "User one name",
      "email": "user-one-email@example.com"
    }
  }
}
```
### II. Ответы сервера на успешные запросы после авторизации

#### 1. Загрузка информации об авторизованном пользователе

Сделайте запрос вида:

`GET http://localhost:PORT/users/me`

Если запрос прошёл успешно, в ответе Вы получите JSON-объект с авторизованным пользователем следующего вида:

Status: `200 OK`

```
{
  "status": "success",
  "data": {
    "user": {
      "_id": "e20537ed11237f86bbb20ccb",
      "name": "User one name",
      "email": "user-one-email@example.com"
    }
  }
}
```

#### 2. Загрузка всех статей авторизованного пользователя

Сделайте запрос вида:

`GET http://localhost:PORT/articles`

Если запрос прошёл успешно, в ответе Вы получите JSON-объект, содержащий массив со всеми созданными статьями авторизованного пользователя следующего вида:

Status: `200 OK`

```
{
  "status": "success",
  "results": 2,
  "data": {
    "articles": [
      {
        "_id": "5e9490b39f2b1a248c978979",
        "keyword": "User-one article-one keyword",
        "title": "User-one article-one title",
        "text": "User-one article-one text",
        "date": "13, апреля 2020",
        "source": "example.com",
        "link": "https://example.com/2020/04/13/article-one-title/",
        "image": "https://example.com/content/uploads/2020/04/13/article-one-image.jpg/"
      },
      {
        "_id": "5e9490c89f2b1a248c97897a",
        "keyword": "User-one article-two keyword",
        "title": "User-one article-two title",
        "text": "User-one article-two text",
        "date": "13, апреля 2020",
        "source": "example.com",
        "link": "https://example.com/2020/04/13/article-two-title/",
        "image": "https://example.com/content/uploads/2020/04/13/article-two-image.jpg/"
      }
    ]
  }
}
```

В случае если ни одной статьи ещё не существует, в ответе Вы получите JSON-объект, содержащий пустой массив статей, т.е. `[]`:

Status: `200 OK`

```
{
  "status": "success",
  "results": 0,
  "data": {
    "articles": []
  }
}
```

#### 3. Создание новой статьи

Сделайте запрос вида:

`POST http://localhost:PORT/articles`

В теле запроса передайте JSON-объект следующего вида:

```
{
	"keyword": "User-one article-one keyword",
	"title": "User-one article-one title",
	"text": "User-one article-one text",
	"date": "13, апреля 2020",
	"source": "example.com",
	"link": "https://example.com/2020/04/13/article-one-title/",
	"image": "https://example.com/content/uploads/2020/04/13/article-one-image.jpg/"
}
```

Требования к полям передаваемого JSON-объекта:

* **keyword**: строка; обязательное поле;
* **title**: строка; обязательное поле;
* **text**: строка; обязательное поле;
* **date**: строка; обязательное поле;
* **source**: строка; обязательное поле;
* **link**: строка, содержащая URL статьи; обязательное поле;
* **image**: строка, содержащая URL изображения статьи; обязательное поле.

Если запрос прошёл успешно, в ответе Вы получите JSON-объект с созданной статьёй следующего вида:

Status: `201 Created`

```
{
  "status": "success",
  "data": {
    "article": {
      "_id": "5e9490b39f2b1a248c978979",
      "keyword": "User-one article-one keyword",
      "title": "User-one article-one title",
      "text": "User-one article-one text",
      "date": "13, апреля 2020",
      "source": "example.com",
      "link": "https://example.com/2020/04/13/article-one-title/",
      "image": "https://example.com/content/uploads/2020/04/13/article-one-image.jpg/"
    }
  }
}
```

#### 4. Удаление статьи авторизованного пользователя

Сделайте запрос вида:

`DELETE http://localhost:PORT/articles/:articleId`

В ответ Вы получите JSON-объект:

Status: `200 OK`

```
{
  "status": "success",
  "message": "Статья удалена"
}
```

Примечание:

* удалить можно только свою статью.

### III. Валидация данных в запросах

Все данные, переданные в теле запроса, проходят процесс валидации перед тем, как будут сохранены в базе данных MongoDB.

В случае если при обращении к серверу в запросе переданы невалидные данные, Вы получите ответ с соответствующим статусом и кодом, а также JSON-объект, формат которого зависит от режима, в котором запущено приложение.

В режиме `production` JSON-объект содержит статус запроса и сообщение об ошибке, характеризующее вид допущенной ошибки:

```
{
  "status": "Request status",
  "message": "Error message"
}
```

В режиме `development` JSON-объект помимо статус запроса и сообщения об ошибке, характеризующего вид допущенной ошибки, также содержит дополнительные поля:

```
{
  "status": "Request status",
  "message": "Error message",
  "name": "Error name",
  "error": {
    "name": "Error name",
    "statusCode": Status code number,
    "isOperational": true
  },
  "stack": Stack trace
}
```

### IV. Обработка ошибок

Помимо данных, которые не прошли валидацию на сервере, ошибку могут вызвать следующие случаи:

1. регистрация пользователя с email, который уже был использован для регистрации другого пользователя;
2. попытка авторизации с неправильно указанными email или password;
3. обращение к ресурсам сервера при отсутствии в запросе заголовка Authorization;
4. обращение к ресурсам сервера при отсутствии в запросе, в заголовке Authorization, токена доступа;
5. обращение к ресурсам сервера с токеном доступа, срок действия которого истек;
6. обращение к ресурсам сервера с токеном доступа, подпись которого недействительна;
7. удаление статьи, созданной другим пользователем;
8. обращение к несуществующему адресу;
9. внутренняя ошибка сервера;
10. превышение лимита обращений к серверу с одного IP в установленный интервал времени.

Примечание:
* в пунктах 3-6 вышеуказанного списка имеются ввиду все доступные ресурсы, за исключением `/signup` и `/signin`.

Во всех вышеуказанных случаях Вы получите ответ с соответствующим статусом и кодом, а также JSON-объект, формат которого зависит от режима, в котором запущено приложение.

В режиме `production` JSON-объект содержит статус запроса и сообщение об ошибке, характеризующее вид допущенной ошибки:

```
{
  "status": "Request status",
  "message": "Error message"
}
```

В режиме `development` JSON-объект помимо статус запроса и сообщения об ошибке, характеризующего вид допущенной ошибки, также содержит дополнительные поля:

```
{
  "status": "Request status",
  "message": "Error message",
  "name": "Error name",
  "error": {
    "name": "Error name",
    "statusCode": Status code number,
    "isOperational": true
  },
  "stack": Stack trace
}
```

Примечания:

* не во всех ошибках будет присутствовать поле stack;
* в некоторых ошибках в объекте error среди прочих полей будет также присутствовать поле message.

### V. Логирование

В приложении реализовано логирование:

1. запросов и ответов;
2. ошибок.

Запросы и ответы записываются в файл `request.log`, ошибки в асинхронном коде - в файл `error.log`, в синхронном - в файл `exceptions.log`.

## Как развернуть проект

Клонируйте репозиторий:

`git clone https://github.com/aleksandr-e-lebedev/news-explorer-api.git`

Для установки необходимых пакетов выполните:

`npm install`

Убедитесь, что у Вас установлена база данных [MongoDB](https://www.mongodb.com/).

Для запуска сервера MongoDB выполните:

`mongod`

Запуск:

* Режим **development** (с hot reload): `npm run dev`;

* Режим **production**: `npm run start`.

Примечания:

1) для работы приложения в режиме `production` необходимо в корневой директории проекта создать конфигурационный файл `.env`, указав в нём переменные окружения (имена переменных см. в файле `config.dev.json`) в соответствии со следующим синтаксисом: на каждой новой строке - `NAME=VALUE`, где `NAME` - это имя переменной, а `VALUE` - её значение;

2) поскольку в приложении реализована авторизация, перед запуском приложения в режиме `production` в конфигурационном файле `.env` в переменной `JWT_SECRET` укажите секретный ключ, который будет использован для создания подписи выдаваемого приложением токена доступа, отличный от секретного ключа в режиме `development`;

3) Вы можете создать криптостойкий псевдослучайный `JWT_SECRET` для режима `production`, выполнив:

```
node -e "console.log(require('crypto').randomBytes(32).toString('hex'));"
```
