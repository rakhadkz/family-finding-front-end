import React from "react";

import { AddUserButton, UsersSearchBar, UsersTable } from "../components/Users";
import { Box, Spacing, Title } from "../components/ui/atoms";
import { Sidebar } from "../components/ui/common";
import { SidebarTemplate } from "../components/ui/templates";

export const UsersPage = () => {
  return (
    <SidebarTemplate sidebar={<Sidebar />}>
      <Title>Users</Title>
      <Spacing m={{ t: "23px" }}>
        <Box d="flex" justify="space-between">
          <UsersSearchBar />
          <AddUserButton />
        </Box>
      </Spacing>
      <Spacing m={{ t: "20px" }}>
        <UsersTable />
      </Spacing>
    </SidebarTemplate>
  );
};
