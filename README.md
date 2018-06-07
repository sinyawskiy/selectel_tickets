Selectel tickets API
====================

Задача
------

Тикет-система​ ​ должна​ ​ состоять​ ​ из:
    - Тикетов,​ ​ у ​ ​ тикетов​ ​ могут​ ​ быть​ ​ комментарии
    - Тикет​ ​ создается​ ​ в ​ ​ статусе​ ​ “открыт”,​ ​ может​ ​ перейти​ ​ в ​ ​ “отвечен”​ ​ или​ ​ “закрыт”,​ ​ из
отвечен​ ​ в ​ ​ “ожидает​ ​ ответа”​ ​или​ ​ “закрыт”,​ ​ статус​ ​ “закрыт”​ ​ финальный​ ​ (нельзя
изменить​ ​ статус​ ​ или​ ​ добавить​ ​ комментарий)


Бизнес логика состояний
```                                    
Время жизни ---->

                    ОЖИДАЕТ ОТВЕТА - ЗАКРЫТ
                  /                
          ОТВЕЧЕН 
       /          \
ОТКРЫТ               ЗАКРЫТ
       \
          ЗАКРЫТ
```

API:

   - Создание​ ​ тикета
   - Изменить​ ​ статус
   - Добавить​ ​ комментарий
   - Получить​ ​ тикет


Тикет​ ​ имеет​ ​ свойства:
    
    - ID
    - Дата​ ​ создания
    - Дата​ ​ изменения
    - Тема
    - Текст
    - Email
    - Статус


Комментарий​ ​ имеет​ ​ свойства:
    
    - ID
    - ID​ ​ тикета
    - Дата​ ​ создания
    - Email
    - Текст


Решение
-------

Загрузить список всех тикетов (с комментариями)
`/api/v1.0/tickets/ GET`


Загрузить определенный тикет (с комментариями)
`/api/v1.0/tickets/<id> GET`


Добавить новый тикет
`/api/v1.0/tickets/ POST`

```
{
    'message': ''
    'subject': ''
    'email': ''
}
```


Получить все комментарии тикета
`/api/v1.0/tickets/<id>/comments/ GET`


Добавить новый комментарий
`/api/v1.0/tickets/<id>/comments/ POST`

```
{
    'message': ''
    'ticket_id': ''
    'email': ''
}
```


Изменить состояние тикета в соответствии с бизнес логикой
`/api/v1.0/tickets/<id>/next_state/ PUT`


Закрыть тикет
`/api/v1.0/tickets/<id>/close/ PUT`


Загрузить список всех комментариев всех тикетов
`/api/v1.0/comments/ GET`


Загрузить определенный комментарий
`/api/v1.0/comments/<id> GET`


Установка приложения
```
python app.py setup

```

Запуск тестов
```
python -m unittest tests
```

или раздельно

```
python -m unittest tests/test_models.py
python -m unittest tests/test_api.py

```

Клиентская часть
================

Клиентская часть написана на react.js исходники находятся в каталоге `client/src`

Для сборки проекта необходимо в каталоге `client` установить зависимости для работы проекта
```
npm i
```

Запустить сервер
```
npm run  server
```

Скриншоты
=========

Создание нового тикета
![Создание нового тикета](https://github.com/sinyawskiy/selectel_tickets/blob/master/img/1.png?raw=true)

Просмотр тикета
![Просмотр тикета](https://github.com/sinyawskiy/selectel_tickets/blob/master/img/2.png?raw=true)

Добавление комментария
![Добавление комментария](https://github.com/sinyawskiy/selectel_tickets/blob/master/img/3.png?raw=true)

Список всех тикетов
![Список всех тикетов](https://github.com/sinyawskiy/selectel_tickets/blob/master/img/4.png?raw=true)

Рассмотрите кандидатуру
![Рассмотрите кандидатуру](https://github.com/sinyawskiy/selectel_tickets/blob/master/img/5.png?raw=true)






