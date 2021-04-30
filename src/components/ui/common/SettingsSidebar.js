import OfficeBuilding from "@atlaskit/icon/glyph/comment";
import React, { memo } from "react";
import { Link } from "react-router-dom";
import Can from "../../../accessControl/Can";
import { useAuth } from "../../../context/auth/authContext";
import { Box, SidebarMenuItem, Spacing } from "../atoms";

const SIDEBAR_ITEMS = (isSuperAdmin = false) => [
  {
    to: "/settings/contacts",
    title: "Message send contacts",
    icon: () => <OfficeBuilding />,
    atLeast: "admin",
  },
];

const SidebarInner = () => {
  const { user } = useAuth();

  return (
    <Box
      d="flex"
      direction="column"
      justify="space-between"
      align="space-between"
      h="100%"
    >
      <Box>
        {SIDEBAR_ITEMS(user?.role === "super_admin").map(
          (item, index) =>
            item.to && (
              <Can
                perform={item.perform}
                yes={() => (
                  <SidebarMenuItem key={index}>
                    <Link to={item.to}>
                      {item.icon()}
                      <Spacing m={{ l: "15px" }}>{item.title}</Spacing>
                    </Link>
                  </SidebarMenuItem>
                )}
              />
            )
        )}
      </Box>
    </Box>
  );
};

export const SettingsSidebar = memo(SidebarInner);
