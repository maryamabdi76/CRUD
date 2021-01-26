import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import EditUser from './EditUser';

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
            <App />
          </Route>
          <Route exact path="/EditUser">
            <EditUser />
          </Route>
        </Switch>
      </div>
    </Router>
    ,
  document.getElementById('root'));
