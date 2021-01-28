import React from "react";
import {
  Redirect,
  Route,
  BrowserRouter as Router,
  Switch,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Sidebar } from "./components/ui/common";
import { SidebarTemplate } from "./components/ui/templates";
import { initialRoutesByRoles } from "./content/initialRoutersByRoles.data";
import { useAuth } from "./context/auth/authContext";
import {
  ACTION_ITEMS,
  ADD,
  CHILDREN,
  COMMUNICATION_TEMPLATES,
  CONTINUOUS_SEARCH,
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
  CommunicationTemplatesPage,
  ContinuousSearchPage,
  NewPassword,
  OrganizationsPage,
  ReportsPage,
  ResetPassword,
  SearchVectorsPage,
  SettingsPage,
  UsersPage,
  NotFound,
  Preloader,
  ComponentWrapper,
  ChildrenPage
} from "./pages";
import LoginPage from "./pages/Login";
import { localStorageKey } from "./utils/requestHandler";
const ChildProfilePage = React.lazy(() => import("./pages/ChildProfilePage"));
const AddCommunicationTemplatePage = React.lazy(() => import('./pages/AddCommunicationTemplatePage'))
const AddChildPage = React.lazy(() => import('./pages/AddChildPage'))
const AddOrganizationPage = React.lazy(() => import('./pages/AddOrganizationPage'))
const AddUserPage = React.lazy(() => import('./pages/AddUserPage'))

const PrivateRoute = ({ roles, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        window.localStorage.getItem(localStorageKey) ? (
          <ComponentWrapper roles={roles}>
            <Component {...props} />
          </ComponentWrapper>
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
    <div style={{ display: "flex" }}>  
      <Router>
        <SidebarTemplate sidebar={<Sidebar />} />
        <React.Suspense fallback={(<Preloader />)}>
        <Switch>
          <PrivateRoute
            exact
            path={`/`}
            component={() =>
              user ? (
                <Redirect to={`/${initialRoutesByRoles[user.role]}`} />
              ) : (
                <Preloader />
              )
            }
          />
          <Route
            exact
            path={`/${LOGIN}`}
            component={() => (user ? <Redirect to="/" /> : <LoginPage />)}
          />
          <Route
            exact
            path={`/${FORGOT_PASSWORD}`}
            component={ResetPassword}
          />
          <Route exact path={`/${NEW_PASSWORD}`} component={NewPassword} />
          <PrivateRoute
            exact
            roles={["a", "m"]}
            path={`/${SEARCHVECTOR}`}
            component={SearchVectorsPage}
          />
          <PrivateRoute
            exact
            roles={["a", "m"]}
            path={`/${SETTINGS}`}
            component={SettingsPage}
          />
          <PrivateRoute
            exact
            roles={["a", "m"]}
            path={`/${COMMUNICATION_TEMPLATES}`}
            component={CommunicationTemplatesPage}
          />
          <PrivateRoute
            exact
            roles={["a", "s"]}
            path={`/${COMMUNICATION_TEMPLATES}-${ADD}`}
            component={AddCommunicationTemplatePage}
          />
          <PrivateRoute
            exact
            roles={["a", "m"]}
            path={`/${REPORTS}`}
            component={ReportsPage}
          />
          <PrivateRoute
            exact
            roles={["s"]}
            path={`/${USERS}`}
            component={(props) => (
              <UsersPage isOrganization={false} {...props} />
            )}
          />
          <PrivateRoute
            exact
            roles={["s", "m", "a"]}
            path={`/${ORGANIZATION_USERS}`}
            component={(props) => (
              <UsersPage isOrganization={true} {...props} />
            )}
          />
          <PrivateRoute
            exact
            roles={["u", "m", "a"]}
            path={`/${ORGANIZATION_USERS}/:id`}
            component={(props) => (
              <UsersPage isOrganization={true} {...props} />
            )}
          />
          <PrivateRoute
            exact
            roles={["s"]}
            path={`/${ORGANIZATIONS}`}
            component={OrganizationsPage}
          />
          <PrivateRoute
            exact
            roles={["s"]}
            path={`/${ORGANIZATIONS}-${ADD}`}
            component={AddOrganizationPage}
          />
          <PrivateRoute
            exact
            roles={["s", "a"]}
            path={`/${USERS}-${ADD}`}
            component={AddUserPage}
          />
          <PrivateRoute
            exact
            roles={["s"]}
            path={`/${USERS}/:id`}
            component={UsersPage}
          />
          <PrivateRoute
            exact
            roles={["a", "m"]}
            path={`/${CHILDREN}-${ADD}`}
            component={AddChildPage}
          />
          <PrivateRoute
            exact
            roles={["s"]}
            path={`/${ORGANIZATIONS}/:id`}
            component={OrganizationsPage}
          />
          <PrivateRoute
            exact
            roles={["a", "u", "m"]}
            path={`/${ACTION_ITEMS}`}
            component={ActionItemsPage}
          />
          <PrivateRoute
            exact
            roles={["a", "u", "m"]}
            path={`/${CHILDREN}`}
            component={ChildrenPage}
          />
          <PrivateRoute
            exact
            roles={["a", "u", "m"]}
            path={`/${CHILDREN}/:id`}
            component={ChildProfilePage}
          />
          <PrivateRoute component={NotFound} />
          <ToastContainer />
        </Switch>
        </React.Suspense>
      </Router>
    </div>
  );
}

export default App;
