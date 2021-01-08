import React, { useEffect, useState } from "react";
import * as auth from "./authProvider";

export const AuthContext = React.createContext();

export const AuthProvider = (props) => {
  const [user, setUser] = useState(null);
  const [isSignedIn, setSignedIn] = useState(true);
  const [organization, setOrganization] = useState();

  useEffect(() => {
    isAuthorized();
  }, []);

  useEffect(() => {
    if (user) {
      setSignedIn(true);
    } else {
      setSignedIn(false);
    }
  }, [user]);

  const fetchMe = React.useCallback(
    () =>
      auth
        .fetchMe()
        .then(
          (user) =>
            user &&
            setUser({
              ...user,
              role: user?.user_organizations[0]?.role || user.role,
            })
        ),
    []
  );

  useEffect(() => {
    if (isSignedIn) fetchMe();
  }, []);

  useEffect(() => {
    if (organization) {
      setUser({
        ...user,
        role: organization.role,
        activeOrganization: organization,
      });
    }
  }, [organization]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const isAuthorized = () => {
    const token = auth.getToken();
    console.log("TOKEN", token);
    if (token) {
      setSignedIn(true);
      return true;
    } else {
      setSignedIn(false);
      return false;
    }
  };

  const login = React.useCallback((form) => auth.login(form).then(setUser), []);

  const sign = React.useCallback((form) => auth.signup(form), []);

  const reset = React.useCallback((form) => auth.reset(form).then(setUser), []);

  const newPassword = React.useCallback((form) => {
    console.log(form);
    return auth.newPassword(form).then(setUser);
  }, []);

  const logout = React.useCallback(() => {
    auth.logout();
    setUser(null);
    setSignedIn(false);
  }, []);

  const value = React.useMemo(
    () => ({
      user,
      isSignedIn,
      isAuthorized,
      login,
      logout,
      sign,
      reset,
      newPassword,
      fetchMe,
      setUser,
      organization,
      setOrganization,
    }),
    [
      user,
      isSignedIn,
      isAuthorized,
      login,
      logout,
      sign,
      reset,
      newPassword,
      fetchMe,
      setUser,
    ]
  );

  return <AuthContext.Provider value={value} {...props} />;
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error(`useAuth must be used within a AuthProvider`);
  }
  return context;
};
