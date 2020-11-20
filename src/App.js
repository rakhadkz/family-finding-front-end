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
  ACTION_ITEMS,
  CHILDREN,
} from "./helpers/routes";
import {
  AddOrganizationPage,
  AddUserPage,
  NewPassword,
  OrganizationsPage,
  ResetPassword,
  UsersPage,
  ChildrenPage,
  ActionItemsPage,
} from "./pages";
import LoginPage from "./pages/Login";

function App() {
  const { isSignedIn } = useAuth();

  return (
    <>
      {isSignedIn ? (
        <Router>
          <Switch>
            <Route exact path={`/${USERS}`} component={UsersPage} />
            <Route exact path={`/${USERS}/${ADD}`} component={AddUserPage} />
            <Route
              exact
              path={`/${ORGANIZATIONS}`}
              component={OrganizationsPage}
            />
            <Route
              exact
              path={`/${ORGANIZATIONS}/${ADD}`}
              component={AddOrganizationPage}
            />
            <Route
              exact
              path={`/${ACTION_ITEMS}`}
              component={ActionItemsPage}
            />
            <Route exact path={`/${CHILDREN}`} component={ChildrenPage} />
            <Route exact path={`/${CHILDREN}/*`} component={ChildrenPage} />
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
