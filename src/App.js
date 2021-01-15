import React from "react";
import { Redirect, Route, useHistory } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GroupAccess } from "./components/common";
import { Sidebar } from "./components/ui/common";
import { SidebarTemplate } from "./components/ui/templates";
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
  CONTINUOUS_SEARCH,
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
  ContinuousSearchPage,
} from "./pages";
import { ChildProfilePage } from "./pages/ChildProfilePage";
import LoginPage from "./pages/Login";
import { localStorageKey } from "./utils/requestHandler";

const PrivateRoute = ({ component: Component, ...rest }) => {
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
  const { user } = useAuth();
  return (
    <>
      <SidebarTemplate sidebar={<Sidebar />}>
        <GroupAccess atLeast="manager" exact="admin">
          <PrivateRoute
            exact
            path={`/${CONTINUOUS_SEARCH}`}
            component={ContinuousSearchPage}
          />
        </GroupAccess>
        <GroupAccess atLeast="manager" exact="admin">
          <PrivateRoute
            exact
            path={`/${SEARCHVECTOR}`}
            component={SearchVectorsPage}
          />
        </GroupAccess>
        <GroupAccess atLeast="manager" exact="admin">
          <PrivateRoute exact path={`/${SETTINGS}`} component={SettingsPage} />
        </GroupAccess>
        <GroupAccess atLeast="manager" exact="admin">
          <PrivateRoute
            exact
            path={`/${COMMUNICATION_TEMPLATES}`}
            component={CommunicationTemplatesPage}
          />
        </GroupAccess>
        <GroupAccess atLeast="manager" exact="admin">
          <PrivateRoute exact path={`/${REPORTS}`} component={ReportsPage} />
        </GroupAccess>
        <GroupAccess exact="super_admin">
          <PrivateRoute
            exact
            path={`/${USERS}`}
            component={(props) => <UsersPage isOrganization={false} {...props} />}
          />
        </GroupAccess>
        <GroupAccess atLeast="manager" exact="super_admin">
          <PrivateRoute
            exact
            path={`/${ORGANIZATION_USERS}`}
            component={(props) => <UsersPage isOrganization={true} {...props} />}
          />
        </GroupAccess>
        <GroupAccess atLeast="user" exact="admin">
          <PrivateRoute
            exact
            path={`/${ORGANIZATION_USERS}/:id`}
            component={(props) => <UsersPage isOrganization={true} {...props} />}
          />
        </GroupAccess>
        <GroupAccess exact="super_admin">
          <PrivateRoute
            exact
            path={`/${ORGANIZATIONS}`}
            component={OrganizationsPage}
          />
        </GroupAccess>
        <GroupAccess exact="super_admin">
          <PrivateRoute
            exact
            path={`/${ORGANIZATIONS}-${ADD}`}
            component={AddOrganizationPage}
          />  
        </GroupAccess>
        <GroupAccess atLeast="admin" exact="super_admin">
          <PrivateRoute exact path={`/${USERS}-${ADD}`} component={AddUserPage} />
        </GroupAccess>
        <GroupAccess exact="super_admin">
          <PrivateRoute exact path={`/${USERS}/:id`} component={UsersPage} />
        </GroupAccess>
        <GroupAccess atLeast="manager" exact="admin">
          <PrivateRoute
            exact
            path={`/${CHILDREN}-${ADD}`}
            component={AddChildPage}
          />
        </GroupAccess>
        <GroupAccess exact="super_admin">
          <PrivateRoute
            exact
            path={`/${ORGANIZATIONS}/:id`}
            component={OrganizationsPage}
          />
        </GroupAccess>
        <GroupAccess atLeast="user" exact="admin">
          <PrivateRoute
            exact
            path={`/${ACTION_ITEMS}`}
            component={ActionItemsPage}
          />
        </GroupAccess>
        <GroupAccess atLeast="user" exact="admin">
          <PrivateRoute exact path={`/${CHILDREN}`} component={ChildrenPage} />
        </GroupAccess>
        <GroupAccess atLeast="user" exact="admin">
          <PrivateRoute
            exact
            path={`/${CHILDREN}/:id`}
            component={ChildProfilePage}
          />
        </GroupAccess>
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
        <Route path={`/${LOGIN}`} component={() => user ? <Redirect to='/'/> : <LoginPage />}/>
        <Route path={`/${FORGOT_PASSWORD}`} component={ResetPassword} />
        <Route path={`/${NEW_PASSWORD}`} component={NewPassword} />
        <ToastContainer />
      </SidebarTemplate>
    </>
  );
}

export default App;
