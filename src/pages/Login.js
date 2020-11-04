import React from "react";
import { LoginForm } from "../components/Login";
import LoginLayout from "./../containers/LoginLayout";

function LoginPage() {
  return (
    <LoginLayout>
      <LoginForm />
    </LoginLayout>
  );
}

export default LoginPage;
