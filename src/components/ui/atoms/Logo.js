import React from "react";
import SidebarLogo from "../../../assets/SidebarLogo.svg";

export const Logo = ({ h = "50px" }) => {
  return <img style={{ height: h }} alt="Logo" src={SidebarLogo} />;
};
