# Road map

the project is educational and uses the React and Firebase

## Создаем проект используя Create React App

  ### Если установлен npm 5.2.0+, лучше использовать npx
  
    npx create-react-app my-app

  ###  Удаляем все файлы, которые точно не понадобятся в проекте

## Добавляем зависимости

  ### DevDependencies
  
    npm i @babel/core eslint eslint-config-htmlacademy -DE

  ### Dependencies
  
    npm i react-router-dom typescript firebase react-firebase-hooks node-sass

  • node-sass - если нужно использовать стили scss

  • react-firebase-hooks - позволяет более комфортно взаимодействовать с авторизацией и базой данных

## Для корректной работы линтера создаем

  ### .editorconfig

    root = true

    [*]
    charset = utf-8
    end_of_line = lf
    indent_size = 2
    indent_style = space
    insert_final_newline = true
    trim_trailing_whitespace = true

    [*.md]
    trim_trailing_whitespace = false

  ### .eslintrc.yml

    env:
      es2017: true
      browser: true
      commonjs: true
      jest: true

    extends: ['htmlacademy/es6', 'plugin:react/recommended']

    parserOptions:
      ecmaFeatures:
        jsx: true
      ecmaVersion: 2018
      sourceType: module

    plugins: ['react']

    settings:
      react:
        version: '16'

## Добавляем компоненты

  • В src → папку components

  • В components → создаем папки chat, login, message, navbar, sidebar

  • А в них → аналогичные друг другу .jsx и .scss файлы chat, login, message, navbar, sidebar
  для быстрого создания используем сниппет rsc, который разворачивает функциональный компонент

  • В components/index.js → экспорты компонентов: export {default as Chat} from './chat/chat.jsx'

## Настраиваем роутинг

  ### Выносим константы constants.js:

    const LOGIN_ROUTE = '/login';
    const CHAT_ROUTE = '/chat'

  LOGIN_ROUTE - понадобится для всех пользователей

  CHAT_ROUTE - маршрут только для авторизованных

  ### Выносим пути для роутинга в отдельный файл routes.js:

  Это будут массивы, которые содержат объекты <путь, объект отрисовки>

    const publicRoutes = [{path: LOGIN_ROUTE, Component: Login}];
    const privateRoutes = [{path: CHAT_ROUTE, Component: Chat}];

  ### Создаем компонент навигации AppRoute.jsx: 

  Здесь будут описаны все маршруты, по которым мы сможем переходить в приложении

    const AppRouter = () => {
      const user = false;
      return user ? (
          <Switch>
            {privateRoutes.map(({path, Component}) => <Route key={path} path={path} component={Component} exact={true} />)}
            <Redirect to={CHAT_ROUTE} />   
          </Switch>
        ) : (
          <Switch>
            {publicRoutes.map(({path, Component}) => <Route key={path} path={path} component={Component} exact={true} />)}
            <Redirect to={LOGIN_ROUTE} />   
          </Switch>
        );
    };

  user - пока моковая переменная. Если равна true, значит пользователь авторизован

  Switch итерируется по всем путям и в том случае, если ничего не найдено, возвращает последний маршрут. В нашем случае - Redirect. Это необходимо для того, чтобы пользователь, при неверном наборе пути, возвращался или на CHAT_ROUTE, или на LOGIN_ROUTE


  ### Оборачиваем приложение на уровне App.jsx в BrowserRouter

    function App() {
      return (
        <BrowserRouter>
          <Navbar>
          <AppRouter />
        <BrowserRouter />
      );
    }

  В данном случае Navbar будет отрисовываться в любом случае, а AppRouter - по выбору - для пользователей: авторизованных или неавторизованых

## Настраиваем Firebase

  ### В проект/src/index.js подключаем firebase

    import firebase from 'firebase';
    import 'firebase/firestore';
    import 'firebase/auth';

  ### На сайте firebase создаем новый проект. 

  ### Копируем из firebaseConfig настройки:

  var firebaseConfig = {...};

  ### Вставляем их в проект/src/index.js
    
    firebase.initializeApp(firebaseConfig({
      ...
    }))

  ### Настраиваем на сайте firebase аутентификацию

   • вкладка authentication

   • выбираем google

   • выбираем свою учетную запись

   • сохраняем

  ### В проект/src/index.js вызываем объект auth

    import firebase from 'firebase/app';
    import 'firebase/auth';

    const auth = firebase.auth();

## LogIn - LogOut

  Создаем контекст, позволяющий прокидывать и извлекать пропсы в независимых друг от друга компонентах. Это позволит передавать между компонентами объект auth

  ### В src/index.js добавляем Context оборачиваем App контекстом и передаем ему auth

  Context необходимо экспортировать, т.к. он понадобится в других компонентах

    import {createContext} from 'react';

    export const Context = createContext(null);

    ReactDOM.render(
      <Context.Provider value={{auth}}>
        <App />
      </Context.Provider>,
      document.getElementById(`root`));


  ### Логинимся

  В компоненте Login извлекаем auth из Context. Необходимо импортировать в т.ч. Context

    import {Context} from '../..';
    import firebase from 'firebase/app';

    const {auth} = useContext(Context);

  В компоненте Login создадим функцию, которая будет вызываться при нажатии на кнопку

    const login = async () => {
      const provider = new firebase.auth.GoogleAuthProvider();
      const {user} = await auth.signInWithPopup(provider);
      console.log(user);
    };

  Функция асинхронная. Конструктор new firebase позволяет получить провайдер авторизации, который передаем в auth. Из полученного user можно извлечь необходимые данные (displayName, email, photoURL и прочее). Теперь на кнопку можно повесить слушатель события

    <button onClick={login} className="login__btn">Login with Google</button>

  ### Заменяем везде моковый auth реальным объектом в AppRoute.jsx и в компоненте Navbar

    import {useContext} from 'react';
    import {useAuthState} from "react-firebase-hooks/auth";

    const {auth} = useContext(Context);
    const [user] = useAuthState(auth);

  ### Разлогирование

  В Navbar добавляем событие нажатия

    <button onClick={() => auth.signOut()}>Выйти</button>

## LIFEHACKS

  ### Запустить приложение на другом порте

  Прописать в package.json

    "start": "set port=3006 && react-scripts start"
