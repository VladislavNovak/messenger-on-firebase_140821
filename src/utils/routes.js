import {CHAT_ROUTE, LOGIN_ROUTE} from './constants';
import Login from '../components/login/login';
import Chat from '../components/chat/chat';

export const publicRoutes = [
  {
    path: LOGIN_ROUTE,
    Component: Login
  }
];

export const privateRoutes = [
  {
    path: CHAT_ROUTE,
    Component: Chat
  }
];
