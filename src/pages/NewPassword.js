import React from "react";
import { NewPasswordForm } from "../components/Login";
import LoginLayout from "../containers/LoginLayout";

export const NewPassword = () => {
  return (
    <LoginLayout>
      <NewPasswordForm />
    </LoginLayout>
  );
};
