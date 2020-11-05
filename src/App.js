import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "./context/auth/authContext";
import { FORGOT_PASSWORD, LOGIN, NEW_PASSWORD } from "./helpers/routes";
import { NewPassword, ResetPassword } from "./pages";
import LoginPage from "./pages/Login";

function App() {
  const { isSignedIn } = useAuth();

  return (
    <>
      {isSignedIn ? (
        "Hello here auth"
      ) : (
        <Router>
          <Switch>
            <Route path={`/${LOGIN}`} component={LoginPage} />
            <Route path={`/${FORGOT_PASSWORD}`} component={ResetPassword} />
            <Route path={`/${NEW_PASSWORD}`} component={NewPassword} />
            <Redirect exact from="/" to={`/${LOGIN}`} />
          </Switch>
        </Router>
      )}
      <ToastContainer />
    </>
  );
}

export default App;
