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

  • В components/index.js → экспорты компонентов: 
  
    export {default as AppRouter} from './app-router/app-router.jsx';
    export {default as Chat} from './chat/chat.jsx';
    export {default as Login} from './login/login.jsx';
    export {default as Message} from './message/message.jsx';
    export {default as Navbar} from './navbar/navbar.jsx';

## Настраиваем роутинг

  ### Выносим константы constants.js:

    const LOGIN_ROUTE = '/login';
    const CHAT_ROUTE = '/chat'

  Первый понадобится для всех, второй - маршрут только для авторизованных пользователей

  ### Выносим пути для роутинга в отдельный файл routes.js:

  Это будут массивы, которые содержат объекты <путь, объект отрисовки>

    import {CHAT_ROUTE, LOGIN_ROUTE} from './constants';
    import Login from '../components/login/login';
    import Chat from '../components/chat/chat';

    export const publicRoutes = [{path: LOGIN_ROUTE, Component: Login}];
    export const privateRoutes = [{path: CHAT_ROUTE, Component: Chat}];

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

  В данном случае Navbar будет отрисовываться в любом случае, а компоненты в AppRouter - по выбору: авторизованных пользователей или нет

## Настраиваем Firebase

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

  ### В проект/src/index.js подключаем firebase и вызываем объект auth

    import firebase from 'firebase/app';
    import 'firebase/auth';

    const auth = firebase.auth();

## LogIn - LogOut

  ### В src/index.js добавляем Context оборачиваем App контекстом и передаем ему auth
  Создаем контекст, позволяющий прокидывать и извлекать пропсы в независимых друг от друга компонентах. Это позволит передавать между компонентами объект auth. Context необходимо экспортировать, т.к. он понадобится в других компонентах

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

## Добавляем лоадер

  Создаем компонент Loader и добавляем в App код

    import React, {useContext} from 'react';
    import {Context} from '../..';
    import {useAuthState} from "react-firebase-hooks/auth";

    function App() {
    const {auth} = useContext(Context);
    const [, loading] = useAuthState(auth);

    if (loading) {
      return <Loader />;
    }

    return (
      <BrowserRouter>
        <Navbar />
        <AppRouter />
      </BrowserRouter>
    );
  }

## Чат на основе firebase

  ### Создадим в Cloud Firestore коллекцию

  База данных - firestore - на сервере состоит из коллекций, которыми можно оперировать. Для начала нужно их зарегистрировать. Перейдем на вкладку firestore.database. Нажимаем кнопку `Создать базу данных`, выбираем тестовый режим, выбираем ближайший сервер. 
  
  База данных на сервере состоит из коллекций. Коллекции можно называть как угодно, к примеру, `messages`. Тогда, при отправке данных на сервер, мы будем их наименование видеть в закладке Firestore Database → Cloud Firestore

  ### Подключение firestore в src/index.js

  Импортируем firestore, извлекаем его из firebase и передаем в контекст для последующего использования в других компонентах

    import 'firebase/firestore';

    const firestore = firebase.firestore();

    <Context.Provider value={{auth, firestore}}>

  ### Создаём компонент Chat, стилизуем его и подключаем все импорты

    import React, {useContext} from 'react';
    import {Context} from '../..';
    import {useAuthState} from "react-firebase-hooks/auth";
    import {useCollectionData} from "react-firebase-hooks/firestore";

    const {auth, firestore} = useContext(Context);
    const [user] = useAuthState(auth);

  ### Получение данных с сервера

  Теперь нужно получить коллекцию с сервера. Это делается с помощью хука useCollectionData(). Его главный параметр - запрос коллекции. Коллекцию назовем `messages`. Сразу же можно отсортировать полученную информацию с помощью метода orderBy. useCollectiionData возвращает кортеж из информации и статуса загрузки

    const [messages, loading] = useCollectionData(firestore.collection(`message`).orderBy(`createdAt`));

  Теперь в Chat можно добавить компонент и Loader

    import Loader from '../loader/loader';

    if (loading) {return <Loader />;}

  ### Отправка данных на сервер

  Добавляем в Chat стэйт и событие клика sendMessage. Т.к. взаимодействие происходит с сетью, функция будет асинхронной. Сервер принимает коллекцию. Чуть ранее мы договорились, что она называется `messages`. Теперь, с помощью метода add добавим в отправляемую коллекцию те поля, которые сочтем нужным. В самом конце очищаем поле

    import {useState} from 'react';

    const [msg, setMsg] = useState(``);

    const sendMessage = async () => {
      firestore.collection(`messages`).add({
        uid: user.uid,
        displayName: user.displayName,
        photoURL: user.photoURL,
        text: msg,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      });

      setMsg(``);
    };

    <textarea
      value={msg}
      onChange={({target}) => setMsg(target.value)}
      placeholder="Enter your message" />
    <button
      onClick={sendMessage}
      href="#" className="btn">Send</button>

## Запустить приложение на другом порте

  Прописать в package.json

    "start": "set port=3006 && react-scripts start"
