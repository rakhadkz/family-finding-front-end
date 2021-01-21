import ChildIssuesIcon from "@atlaskit/icon/glyph/child-issues";
import EmojiSymbolsIcon from "@atlaskit/icon/glyph/emoji/symbols";
import MentionIcon from "@atlaskit/icon/glyph/mention";
import OfficeBuilding from "@atlaskit/icon/glyph/office-building";
import People from "@atlaskit/icon/glyph/people";
import QueuesIcon from "@atlaskit/icon/glyph/queues";
import Screen from "@atlaskit/icon/glyph/screen";
import SettingsIcon from "@atlaskit/icon/glyph/settings";
import Signout from "@atlaskit/icon/glyph/sign-out";
import Select from "@atlaskit/select";
import React, { memo } from "react";
import { Link, useHistory } from "react-router-dom";
import { updateUserRequest } from "../../../api/user/userRequest";
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

const SidebarInner = () => {
  const { logout, user, fetchMe } = useAuth();
  const history = useHistory();
  const setCurrentOrganization = async(data) => {
    await updateUserRequest(user.id, {
      "user": {
        "organization_id": data.organization_id,
        "role": data.role
      }
    })
    await fetchMe()
    history.push('/')
  }

  return (
    <Box
      d="flex"
      direction="column"
      justify="space-between"
      align="space-between"
      h="100%"
    >
      <Box>
        <Box d="flex" align="center" justify="center" h="90px">
          <Logo link={user?.selectedOrganization?.value.organization.logo}/>
        </Box>
        <Spacing m={{ l: "15px", b: "15px", t: "15px" }}>
          <Select
            onChange={({ value }) => value.organization_id !== user.organization_id && setCurrentOrganization(value)}
            value={user?.selectedOrganization}
            className="single-select"
            classNamePrefix="react-select"
            options={user?.user_organizations?.map((userOrganizations) => ({
              value: userOrganizations,
              label: userOrganizations?.organization?.name,
            }))}
          />
        </Spacing>

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
              history.push('/')
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

export const Sidebar = memo(SidebarInner);
