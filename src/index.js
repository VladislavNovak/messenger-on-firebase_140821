import React, {createContext} from 'react';
import ReactDOM from 'react-dom';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import {App} from './components';
import './assets/sass/style.scss';

// ---------------------------------------------------------------------------------------------------------

firebase.initializeApp({
  apiKey: `AIzaSyBHD5wM6tZmz5hnmfb40eXWi1tXTIm_DQY`,
  authDomain: `messenger-on-firebase-140821.firebaseapp.com`,
  projectId: `messenger-on-firebase-140821`,
  storageBucket: `messenger-on-firebase-140821.appspot.com`,
  messagingSenderId: `962913011594`,
  appId: `1:962913011594:web:039eafce0031fb7e06aa73`,
  measurementId: `G-YK1CJGC3MS`
});

export const Context = createContext(null);

const auth = firebase.auth();
const firestore = firebase.firestore();

ReactDOM.render(
    <Context.Provider value={{auth, firestore}}>
      <App />
    </Context.Provider>,
    document.getElementById(`root`)
);
