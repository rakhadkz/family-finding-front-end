import React from "react";
import { ResetPasswordForm } from "../components/Login";
import LoginLayout from "../containers/LoginLayout";

export const ResetPassword = () => {
  return (
    <LoginLayout>
      <ResetPasswordForm />
    </LoginLayout>
  );
};
