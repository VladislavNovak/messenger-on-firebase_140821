import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import {CHAT_ROUTE, LOGIN_ROUTE} from '../../utils/constants';
import {privateRoutes, publicRoutes} from '../../utils/routes';
import './app-router.scss';

const AppRouter = () => {
  const user = false;

  return (
    <main className="app-router">
      {
        user ? (
          <Switch>
            {privateRoutes.map(({path, Component}) => <Route key={path} path={path} component={Component} exact={true} />)}
            <Redirect to={CHAT_ROUTE} />
          </Switch>
        ) : (
          <Switch>
            {publicRoutes.map(({path, Component}) => <Route key={path} path={path} component={Component} exact />)}
            <Redirect to={LOGIN_ROUTE} />
          </Switch>
        )

      }
    </main>
  );
};

export default AppRouter;
