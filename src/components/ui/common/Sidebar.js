import ChildIssuesIcon from "@atlaskit/icon/glyph/child-issues";
import EmojiSymbolsIcon from "@atlaskit/icon/glyph/emoji/symbols";
import MentionIcon from "@atlaskit/icon/glyph/mention";
import OfficeBuilding from "@atlaskit/icon/glyph/office-building";
import People from "@atlaskit/icon/glyph/people";
import QueuesIcon from "@atlaskit/icon/glyph/queues";
import Screen from "@atlaskit/icon/glyph/screen";
import SearchIcon from "@atlaskit/icon/glyph/search";
import SettingsIcon from "@atlaskit/icon/glyph/settings";
import Signout from "@atlaskit/icon/glyph/sign-out";
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../context/auth/authContext";
import { GroupAccess } from "../../common";
import { Box, Logo, SidebarMenuItem, Spacing } from "../atoms";
import { SidebarUser } from "./SidebarUser";

const SIDEBAR_ITEMS = [
  {
    to: "/",
    title: "Organizations",
    icon: () => <OfficeBuilding />,
    exact: "super_admin",
  },

  {
    to: "/action-items",
    title: "Action Items",
    icon: () => <Screen />,
    atLeast: "user",
  },
  {
    to: "/children",
    title: "Children",
    icon: () => <EmojiSymbolsIcon />,
    atLeast: "user",
  },
  {
    to: "/continuous-search",
    title: "Continuous Searches",
    icon: () => <SearchIcon />,
    atLeast: "user",
  },
  {
    to: "/reports",
    title: "Reports",
    icon: () => <QueuesIcon />,
    exact: "admin",
  },
  {
    to: "/users",
    title: "Users",
    icon: () => <People />,
    exact: "super_admin",
  },
  {
    to: "/organization_users",
    title: "Organization Users",
    icon: () => <People />,
    exact: "admin",
  },
  {
    to: "/communications-templates",
    title: "Communications Templates",
    icon: () => <MentionIcon />,
    exact: "admin",
  },
  {
    to: "/settings",
    title: "Settings",
    icon: () => <SettingsIcon />,
    atLeast: "user",
  },
  {
    to: "/search-vectors",
    title: "Search Vectors",
    icon: () => <ChildIssuesIcon />,
    exact: "admin",
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
          <GroupAccess {...item}>
            <SidebarMenuItem key={item.to}>
              <Link to={item.to}>
                {item.icon()}
                <Spacing m={{ l: "15px" }}>{item.title}</Spacing>
              </Link>
            </SidebarMenuItem>
          </GroupAccess>
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
