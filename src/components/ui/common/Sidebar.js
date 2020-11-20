import OfficeBuilding from "@atlaskit/icon/glyph/office-building";
import People from "@atlaskit/icon/glyph/people";
import Signout from "@atlaskit/icon/glyph/sign-out";
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../context/auth/authContext";
import { Box, Logo, SidebarMenuItem, Spacing } from "../atoms";
import { SidebarUser } from "./SidebarUser";
import QueuesIcon from "@atlaskit/icon/glyph/queues";


const SIDEBAR_ITEMS = [
  {
    to: "/",
    title: "Organizations",
    icon: () => <OfficeBuilding />,
  },
  {
    to: "/users",
    title: "Users",
    icon: () => <People />,
  },
  {
    to: "/reports",
    title: "Reports",
    icon: () => <QueuesIcon />,
  },
];

export const Sidebar = () => {
  const { logout } = useAuth();

  return (
    <Box
      d="flex"
      direction="column"
      justify="space-between"
      align="space-between"
      h="100%"
    >
      <Box>
        <Box d="flex" align="center" h="73px">
          <Spacing m={{ l: "8px" }}>
            <Logo />
          </Spacing>
        </Box>
        {SIDEBAR_ITEMS.map((item) => (
          <SidebarMenuItem key={item.to}>
            <Link to={item.to}>
              {item.icon()}
              <Spacing m={{ l: "15px" }}>{item.title}</Spacing>
            </Link>
          </SidebarMenuItem>
        ))}
        <SidebarMenuItem>
          <Link
            onClick={() => {
              logout();
            }}
          >
            <Signout />
            <Spacing m={{ l: "15px" }}>Log Out</Spacing>
          </Link>
        </SidebarMenuItem>
      </Box>
      <SidebarUser />
    </Box>
  );
};
