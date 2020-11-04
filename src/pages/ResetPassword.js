import React from "react";
import { ResetPasswordForm } from "../components/Login";
import LoginContainer from "../containers/LoginContainer";

export const ResetPassword = () => {
  return (
    <LoginContainer>
      <ResetPasswordForm />
    </LoginContainer>
  );
};
