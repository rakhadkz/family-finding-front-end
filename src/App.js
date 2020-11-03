import React from 'react';
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom';
import LoginPage from './pages/Login';
import ResetPassword from './components/Login/ResetPassword'
import NewPassword from './components/Login/NewPassword'
import { LOGIN, FORGOT_PASSWORD, NEW_PASSWORD } from './helpers/routes';

function App() {
  return (
    <Router>
      <Switch>
        <Route path={`/${LOGIN}`} component={LoginPage} />
        <Route path={`/${FORGOT_PASSWORD}`} component={ResetPassword} /> 
        <Route path={`/${NEW_PASSWORD}`} component={NewPassword} /> 
        <Redirect exact from="/" to={`/${LOGIN}`} />
      </Switch>
    </Router>
  );
}

export default App;
