# Запуск сервера

```nodejs 
yarn start
```

Сервер запускается на 3000м порту

# Доступные методы

GET /api/users - Список пользователей
GET /api/roles - Список ролей

POST /api/users - Создание пользователя 
RequestBody {
    /** Фамилия */
    surname: string;
    /** Имя */
    name: string;
    /** Отчество */
    middleName: string;
    /** Дата рождения */
    birthday: Date;
    /** Место рождения */
    birthPlace: string;
    /** Электронная почта */
    email: string;
    /** Идентификатор роли */
    roleId: string;
    /** Номер телефона */
    phoneNumber: string;
    /** Дата регастрации */
    registerDate: Date;
    /** Дата последнего обновления */
    lastUpdate: Date;
}

PUT /api/users/:id - Редактирование пользователя 
:id - идентификатор пользователя
RequestBody {
    /** Фамилия */
    surname: string;
    /** Имя */
    name: string;
    /** Отчество */
    middleName: string;
    /** Дата рождения */
    birthday: Date;
    /** Место рождения */
    birthPlace: string;
    /** Электронная почта */
    email: string;
    /** Идентификатор роли */
    roleId: string;
    /** Номер телефона */
    phoneNumber: string;
    /** Дата регастрации */
    registerDate: Date;
    /** Дата последнего обновления */
    lastUpdate: Date;
}

DELETE /api/users/:id - Удаление пользователя 