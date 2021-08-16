import React, {useContext} from 'react';
import {Context} from '../..';
import {useAuthState} from "react-firebase-hooks/auth";
import {BrowserRouter} from 'react-router-dom';
import {AppRouter, Loader, Navbar} from '..';

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

export default App;
