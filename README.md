# Профильное задание (вопрос 1) для стажировки Frontend Developer VK Tech


## Задание
Необходимо получить с сервера и отобразить список элементов. Список должен поддерживать бесконечный плавный скролл, постепенную подгрузку элементов, локальное удаление и редактирование.

### Требования
- Обязательно использовать TS, React/MobX, CSS-модули, Webpack/Vite, Jest, React Testing Library.
- Для получения списка надо использовать публичный API какого-либо сервиса: github api, npmjs api, imdb api и др. Важно, чтобы список данных был очень большим с возможностью пагинации.
  Пример:  
  ```bash
  curl "https://api.github.com/search/repositories?q=javascript&sort=stars&order=asc&page=2"
  ```
- Добавить аутентификацию, если требует API.
- Работать с API можно через библиотеку, либо делать запросы напрямую.
- Механику отображения и работу со списком необходимо написать самостоятельно, нельзя использовать готовую библиотеку.
- Нужна возможность редактировать и удалять элементы из списка локально (работа со стором).
- Требований к дизайну нет, для отображения списка необходимо использовать любой UI Kit/Framework, например, Ant Design. Обосновать свой выбор.
- Готовое решение разместить на [github.com](http://github.com/). В поле ответа вставить ссылку на GitHub репозиторий с проектом.

### Желательно
- Функциональность покрыть unit-тестами на Jest + React Testing Library.
- Поддержать сортировку списка по разным полям, если поддерживает API.
- Добавить индикацию подгрузки данных.

---

## Решение

Этот проект представляет собой веб-приложение, разработанное с использованием **React** и **TypeScript**.  
Для стилизации компонентов (и работы с отображением списка) использован фреймворк **Ant Design**. Приложение позволяет выполнять поиск репозиториев, редактировать и удалять их локально.

Для удобства первичного взаимодействия была произведена публикация на GitHub Pages.

### Возможности

- **Поиск репозиториев**: возможность искать репозитории по заданным параметрам.
- **Редактирование репозиториев**: изменение названия и описания выбранного репозитория.
- **Удаление репозиториев**: удаление репозиториев из списка результатов поиска.
- **Постраничная подгрузка**: реализация кнопки "Показать больше" для подгрузки дополнительных результатов.  
  Изначально подгружается 10 элементов списка (репозиториев), а с каждым последующим развертыванием списка еще +10, до тех пор пока не будет достигнут конец списка элементов, полученных от GitHub.

### Технологии

- React (Vite для сборки)
- TypeScript
- Ant Design
- Jest + React Testing Library
- CSS-модули
- Redux (для стора)
- axios (для запросов к API GitHub)

### Обоснование выбора технологий

- **Ant Design** был выбран благодаря:
    - Большому набору готовых компонентов, что позволяет значительно ускорить разработку.
    - Хорошей и максимально подробной документации, что облегчает поиск решений и примеров.
- **Redux** был выбран для реализации стора приложения, так как это одно из самых популярных и удобных решений. Также у разработчика уже был опыт работы с этим инструментом.
- Для тестирования использовались **Jest** и **React Testing Library**, чтобы проверить корректность работы компонентов приложения.

### Особенности 

- Реализована возможность редактирования и удаления элементов списка (репозиториев) локально.
- Для отображения списка данных и пользовательского интерфейса использовался **Ant Design**, но также были созданы кастомные компоненты Button и Modal.
- Написано несколько тестов для проверки корректности работы компонентов и их взаимодействия с данными.
  - Тесты для проверки работоспособности кастомного компонента Button.
  - RepoInfoEdit тесты покрывают отображение, редактирование, сохранение, сброс изменений и обработку ошибок при редактировании элемента списка (репозитория).
  - Тесты SearchBar обеспечивают проверку работы фильтров поиска и реакции на пользовательский ввод.

## Запуск проекта

1. Клонируйте репозиторий:
   ```bash
   git clone https://github.com/KatrinBnk/test-vk-tech.git
   ```

2. Перейдите в директорию проекта:
   ```bash
   cd test-vk-tech
   ```

3. Установите зависимости:
   ```bash
   npm install
   ```

4. Запустите приложение:
   ```bash
   npm start
   ```


## Запуск тестов

```bash
npm test
```


## Деплой

Готовое приложение задеплоено на GitHub Pages и доступно по
[ссылке](https://katrinbnk.github.io/test-vk-tech/)

--- 

# Контакты:
- телеграм: https://t.me/Katrin_Bnk
- вконтакте: https://vk.com/katrin_bnk
- почта:  yekaterina@bankoev.ru
