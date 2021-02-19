import React from "react";
import {
  Redirect,
  Route,
  BrowserRouter as Router,
  Switch,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ACTIONS } from "./accessControl/actions";
import Can from "./accessControl/Can";
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
  REPORTS,
  SEARCHVECTOR,
  SETTINGS,
  USERS,
  RESOURCES,
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
  ChildrenPage,
  ChildProfilePage,
  AddCommunicationTemplatePage,
  AddChildPage,
  AddOrganizationPage,
  AddUserPage,
  ResourcesPage,
} from "./pages";
import { AccessDenied } from "./pages/AccessDenied";
import LoginPage from "./pages/Login";
import { localStorageKey } from "./utils/requestHandler";

const PrivateRoute = ({ perform, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        window.localStorage.getItem(localStorageKey) ? (
          <ComponentWrapper>
            <Can
              perform={perform}
              yes={() => <Component {...props} />}
              no={() => <AccessDenied />}
            />
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
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover={false}
        />
        <SidebarTemplate sidebar={<Sidebar />} />
        <React.Suspense fallback={<Preloader />}>
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
              perform={`${SEARCHVECTOR}:${ACTIONS.VISIT}`}
              path={`/${SEARCHVECTOR}`}
              component={SearchVectorsPage}
            />
            <PrivateRoute
              exact
              perform={`${SETTINGS}:${ACTIONS.VISIT}`}
              path={`/${SETTINGS}`}
              component={SettingsPage}
            />
            <PrivateRoute
              exact
              perform={`${COMMUNICATION_TEMPLATES}:${ACTIONS.VISIT}`}
              path={`/${COMMUNICATION_TEMPLATES}`}
              component={CommunicationTemplatesPage}
            />
            <PrivateRoute
              exact
              perform={`${COMMUNICATION_TEMPLATES}:${ACTIONS.ADD}`}
              path={`/${COMMUNICATION_TEMPLATES}-${ADD}`}
              component={AddCommunicationTemplatePage}
            />
            <PrivateRoute
              exact
              perform={`${REPORTS}:${ACTIONS.VISIT}`}
              path={`/${REPORTS}`}
              component={ReportsPage}
            />
            <PrivateRoute
              exact
              perform={`${USERS}:${ACTIONS.VISIT}`}
              path={`/${USERS}`}
              component={(props) => (
                <UsersPage isOrganization={false} {...props} />
              )}
            />
            <PrivateRoute
              exact
              perform={`${ORGANIZATIONS}:${ACTIONS.VISIT}`}
              path={`/${ORGANIZATIONS}`}
              component={OrganizationsPage}
            />
            <PrivateRoute
              exact
              perform={`${ORGANIZATIONS}:${ACTIONS.ADD}`}
              path={`/${ORGANIZATIONS}-${ADD}`}
              component={AddOrganizationPage}
            />
            <PrivateRoute
              exact
              perform={`${USERS}:${ACTIONS.ADD}`}
              path={`/${USERS}-${ADD}`}
              component={AddUserPage}
            />
            <PrivateRoute
              exact
              perform={`${USERS}:${ACTIONS.VISIT_ONE}`}
              path={`/${USERS}/:id`}
              component={UsersPage}
            />
            <PrivateRoute
              exact
              perform={`${CHILDREN}:${ACTIONS.ADD}`}
              path={`/${CHILDREN}-${ADD}`}
              component={AddChildPage}
            />
            <PrivateRoute
              exact
              perform={`${ORGANIZATIONS}:${ACTIONS.VISIT_ONE}`}
              path={`/${ORGANIZATIONS}/:id`}
              component={OrganizationsPage}
            />
            <PrivateRoute
              exact
              perform={`${ACTION_ITEMS}:${ACTIONS.VISIT}`}
              path={`/${ACTION_ITEMS}`}
              component={ActionItemsPage}
            />
            <PrivateRoute
              exact
              perform={`${CHILDREN}:${ACTIONS.VISIT}`}
              path={`/${CHILDREN}`}
              component={ChildrenPage}
            />
            <PrivateRoute
              exact
              perform={`${CHILDREN}:${ACTIONS.VISIT_ONE}`}
              path={`/${CHILDREN}/:id`}
              component={ChildProfilePage}
            />
            <PrivateRoute
              exact
              perform={`${RESOURCES}:${ACTIONS.VISIT}`}
              path={`/${RESOURCES}`}
              component={ResourcesPage}
            />
            <PrivateRoute component={NotFound} />
          </Switch>
        </React.Suspense>
      </Router>
    </div>
  );
}

export default App;
