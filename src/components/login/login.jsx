import React, {useContext} from 'react';
import {Context} from '../..';
import firebase from 'firebase/app';
import './login.scss';

const Login = () => {
  const {auth} = useContext(Context);

  const login = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    await auth.signInWithPopup(provider);
  };

  return (
    <div className="login__container">
      <button onClick={login} className="login__btn">Login with Google</button>
    </div>
  );
};

export default Login;
