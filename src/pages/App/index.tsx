import React from 'react';
import { HashRouter, Route, Redirect } from 'react-router-dom';
import routes from '../../routes';
import { isLogin } from '../../apis/login';

function App () {
  return <HashRouter>
    {
      routes.map(({
        key,
        path,
        component: Comp
      }) => (
        <Route
          key={key}
          path={path}
          render={() => (isLogin() ? <Comp /> : <Redirect to="/choose" />)}>
        </Route>
      ))
    }
  </HashRouter>;
}

export default App;