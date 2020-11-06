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
import {
  ADD,
  FORGOT_PASSWORD,
  LOGIN,
  NEW_PASSWORD,
  ORGANIZATIONS,
  USERS,
} from "./helpers/routes";
import {
  AddOrganizationPage,
  NewPassword,
  ResetPassword,
  SuperAdminDashboardPage,
  UsersPage,
} from "./pages";
import LoginPage from "./pages/Login";

function App() {
  const { isSignedIn } = useAuth();

  return (
    <>
      {isSignedIn ? (
        <Router>
          <Switch>
            <Route path={`/${USERS}`} component={UsersPage} />
            <Route
              path={`/${ORGANIZATIONS}`}
              component={SuperAdminDashboardPage}
            />
            <Route
              path={`/${ORGANIZATIONS}/${ADD}`}
              component={AddOrganizationPage}
            />
            <Redirect exact from="/" to={`/${ORGANIZATIONS}`} />
            <Redirect exact from="/login" to={`/${ORGANIZATIONS}`} />
          </Switch>
        </Router>
      ) : (
        <Router>
          <Switch>
            <Route path={`/${LOGIN}`} component={LoginPage} />
            <Route path={`/${FORGOT_PASSWORD}`} component={ResetPassword} />
            <Route path={`/${NEW_PASSWORD}`} component={NewPassword} />
            <Redirect from="/" to={`/${LOGIN}`} />
          </Switch>
        </Router>
      )}
      <ToastContainer />
    </>
  );
}

export default App;
