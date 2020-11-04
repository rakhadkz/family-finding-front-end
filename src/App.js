import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { FORGOT_PASSWORD, LOGIN, NEW_PASSWORD } from "./helpers/routes";
import { NewPassword, ResetPassword } from "./pages";
import LoginPage from "./pages/Login";

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
