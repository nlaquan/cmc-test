import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Login from './page/Login';
import Home from './page/Home';

export const StateContext = React.createContext(null);

const INIT_STATE = {
  user: null,
  arrayString: '',
  result: []
}

function PrivateRoute({ user, children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        user
          ? children
          : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          )
      }
    />
  );
}

function App() {
  const [state, setState] = useState(INIT_STATE);

  return (
    <Router>
      <Switch>
        <Route path="/login">
          <StateContext.Provider value={[state, setState]}>
            <Login />
          </StateContext.Provider>
        </Route>
        <PrivateRoute exact path="/" user={state.user}>
          <StateContext.Provider value={[state, setState]}>
            <Home />
          </StateContext.Provider>
        </PrivateRoute>
      </Switch>
    </Router >
  );
}

export default App;
