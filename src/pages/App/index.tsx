import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import routes from '../../routes';

function App () {

  return <HashRouter>
    {
      routes.map(({
        key,
        path,
        component
      }) => (
        <Route
          key={key}
          path={path}
          component={component}>
          </Route>
      ))
    }
  </HashRouter>;
}

export default App;