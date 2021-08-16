import React, {useContext} from 'react';
import {Context} from '../..';
import {useAuthState} from "react-firebase-hooks/auth";
import {NavLink} from 'react-router-dom';
import {LOGIN_ROUTE} from '../../utils/constants';

const Navbar = () => {
  const {auth} = useContext(Context);
  const [user] = useAuthState(auth);

  return (
    <div>
      {user ? (
        <button onClick={() => auth.signOut()}>Выйти</button>
      ) : (
        <NavLink to={LOGIN_ROUTE}>
          <button >Логин</button>
        </NavLink>
      )}
    </div>
  );
};

export default Navbar;
