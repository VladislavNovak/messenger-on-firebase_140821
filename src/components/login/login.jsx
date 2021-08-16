import React, {useContext} from 'react';
import {Context} from '../..';
import firebase from 'firebase/app';
import './login.scss';

const Login = () => {
  const {auth} = useContext(Context);

  const login = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    const {user} = await auth.signInWithPopup(provider);
    // eslint-disable-next-line no-console
    console.log(user);
  };

  return (
    <div className="login__container">
      <button onClick={login} className="login__btn">Login with Google</button>
    </div>
  );
};

export default Login;
