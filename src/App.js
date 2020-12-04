import React from "react";
import { Redirect, Route, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { initialRoutesByRoles } from "./content/initialRoutersByRoles.data";
import { useAuth } from "./context/auth/authContext";
import {
  ACTION_ITEMS,
  ADD,
  CHILDREN,
  COMMUNICATION_TEMPLATES,
  FORGOT_PASSWORD,
  LOGIN,
  NEW_PASSWORD,
  ORGANIZATIONS,
  ORGANIZATION_USERS,
  REPORTS,
  SEARCHVECTOR,
  SETTINGS,
  USERS,
} from "./helpers/routes";
import {
  ActionItemsPage,
  AddChildPage,
  AddOrganizationPage,
  AddUserPage,
  ChildrenPage,
  CommunicationTemplatesPage,
  NewPassword,
  OrganizationsPage,
  ReportsPage,
  ResetPassword,
  SearchVectorsPage,
  SettingsPage,
  UsersPage,
} from "./pages";
import { ChildProfilePage } from "./pages/ChildProfilePage";
import LoginPage from "./pages/Login";
import { localStorageKey } from "./utils/requestHandler";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isAuthorized } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) =>
        window.localStorage.getItem(localStorageKey) ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

function App() {
  const { isAuthorized, user } = useAuth();
  let location = useLocation();

  return (
    <>
      <PrivateRoute
        exact
        path={`/${SEARCHVECTOR}`}
        component={SearchVectorsPage}
      />
      <PrivateRoute exact path={`/${SETTINGS}`} component={SettingsPage} />
      <PrivateRoute
        exact
        path={`/${COMMUNICATION_TEMPLATES}`}
        component={CommunicationTemplatesPage}
      />
      <PrivateRoute exact path={`/${REPORTS}`} component={ReportsPage} />
      <PrivateRoute
        exact
        path={`/${USERS}`}
        component={(props) => <UsersPage isOrganization={false} {...props} />}
      />
      <PrivateRoute
        exact
        path={`/${ORGANIZATION_USERS}`}
        component={(props) => <UsersPage isOrganization={true} {...props} />}
      />
      <PrivateRoute exact path={`/${USERS}-${ADD}`} component={AddUserPage} />
      <PrivateRoute exact path={`/${USERS}/:id`} component={UsersPage} />
      <PrivateRoute
        exact
        path={`/${CHILDREN}-${ADD}`}
        component={AddChildPage}
      />
      <PrivateRoute
        exact
        path={`/${ORGANIZATIONS}`}
        component={OrganizationsPage}
      />
      <PrivateRoute
        exact
        path={`/${ORGANIZATIONS}-${ADD}`}
        component={AddOrganizationPage}
      />
      <PrivateRoute
        exact
        path={`/${ORGANIZATIONS}/:id`}
        component={OrganizationsPage}
      />
      <PrivateRoute
        exact
        path={`/${ACTION_ITEMS}`}
        component={ActionItemsPage}
      />
      <PrivateRoute exact path={`/${CHILDREN}`} component={ChildrenPage} />
      <PrivateRoute
        exact
        path={`/${CHILDREN}/:id`}
        component={ChildProfilePage}
      />
      <PrivateRoute
        exact
        path={`/`}
        component={() =>
          user ? (
            <Redirect to={`/${initialRoutesByRoles[user.role]}`} />
          ) : (
            <div>Loading</div>
          )
        }
      />
      <Route path={`/${LOGIN}`} component={LoginPage} />
      <Route path={`/${FORGOT_PASSWORD}`} component={ResetPassword} />
      <Route path={`/${NEW_PASSWORD}`} component={NewPassword} />

      <ToastContainer />
    </>
  );
}

export default App;
