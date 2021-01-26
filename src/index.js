import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { UserProvider } from './context/User';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

ReactDOM.render(
  <Router>
    <div>
      <Switch>
        <Route exact path="/">
          <UserProvider>
            <App />
          </UserProvider>
        </Route>
      </Switch>
    </div>
  </Router>
  ,
  document.getElementById('root'));
