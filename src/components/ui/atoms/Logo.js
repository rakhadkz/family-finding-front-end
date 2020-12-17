import React from "react";
import SidebarLogo from "../../../assets/app_logo.jpg";

export const Logo = ({}) => {
  return (
    <img
      style={{
        height: "80px",
        width: "80px",
        marginTop: "10px",
        marginBottom: "20px",
        marginLeft: "40px",
      }}
      alt="Logo"
      src={SidebarLogo}
    />
  );
};
