import { Chat, Login } from "./components";
import { CHAT_ROUTE, LOGIN_ROUTE } from "./utils/constants";

export const publicRoutes = [
  {
    path: LOGIN_ROUTE,
    component: Login
  }
];

export const privateRoutes = [
  {
    path: CHAT_ROUTE,
    component: Chat
  }
];

// Создаем массивы, которые содержат объекты <путь, объект отрисовки.
// Первый - для логгирования. На него переходят все пользователи.
// Второй - содержит только приватные маршруты пройти по которым сможет только авторизованный пользователь.
