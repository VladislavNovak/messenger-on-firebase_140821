import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';

firebase.initializeApp({
  apiKey: `AIzaSyBHD5wM6tZmz5hnmfb40eXWi1tXTIm_DQY`,
  authDomain: `messenger-on-firebase-140821.firebaseapp.com`,
  projectId: `messenger-on-firebase-140821`,
  storageBucket: `messenger-on-firebase-140821.appspot.com`,
  messagingSenderId: `962913011594`,
  appId: `1:962913011594:web:039eafce0031fb7e06aa73`,
  measurementId: `G-YK1CJGC3MS`
});

const auth = firebase.auth();

ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById(`root`)
);
