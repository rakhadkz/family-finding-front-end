import React from "react";
import { NewPasswordForm } from "../components/Login";
import LoginContainer from "../containers/LoginContainer";

export const NewPassword = () => {
  return (
    <LoginContainer>
      <NewPasswordForm />
    </LoginContainer>
  );
};
