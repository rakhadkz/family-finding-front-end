import React from "react";
import {
  ContainerDiv,
  StyledBackground,
  StyledCard,
  StyledCover,
  StyledField,
  StyledImage,
} from "../components/ui/atoms";
import Cover from "./../assets/Cover.svg";
import frame from "./../assets/Frame.svg";
import logo from "./../assets/logo.png";

function LoginLayout({ children }) {
  return (
    <ContainerDiv className="container">
      <StyledCard>
        <div className="row">
          <StyledCover>
            <StyledBackground src={Cover} />
            <StyledImage src={frame} />
          </StyledCover>
        </div>

        <div className="row">
          <StyledField className="col">
            <img src={logo} alt="logo" />
          </StyledField>
          <StyledField className="col">{children}</StyledField>
        </div>
      </StyledCard>
    </ContainerDiv>
  );
}

export default LoginLayout;
