import React from "react";
import {
  Container,
  StyledBackground,
  StyledCard,
  StyledCover,
  StyledField,
  StyledImage,
  Box,
} from "../components/ui/atoms";
import {} from "../components/ui/molecules";
import Cover from "./../assets/Cover.svg";
import frame from "./../assets/Frame.svg";
import logo from "./../assets/app_logo.jpg";
import loginImage from "./../assets/loginImage.jpg";
import app_logo from "./../assets/app_logo.jpg";
import "./some.css";

function LoginContainer({ children }) {
  return (
    <div className="login-container">
      <div className="suka">
        <div className="overlay"></div>
        <h1>Linking Lives</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </div>
      <div className="murat">
        <img
          src={app_logo}
          style={{
            maxWidth: "230px",
            marginBottom: "-80px",
            marginTop: "-50px",
          }}
        />
        {children}
      </div>
    </div>
  );
}

export default LoginContainer;
