import React from "react";
import { useHistory } from "react-router-dom";
import { AddUserButton, UsersSearchBar, UsersTable } from "../components/Users";
import { Box, Spacing, Title } from "../components/ui/atoms";
import { Sidebar } from "../components/ui/common";
import { SidebarTemplate } from "../components/ui/templates";

export const UsersPage = () => {
  const history = useHistory();
  return (
    <SidebarTemplate sidebar={<Sidebar />}>
      <Title>Users</Title>
      <Spacing m={{ t: "23px" }}>
        <Box d="flex" justify="space-between">
          <UsersSearchBar />
          <AddUserButton onClick={() => history.push("/users/add")} />
        </Box>
      </Spacing>
      <Spacing m={{ t: "20px" }}>
        <UsersTable />
      </Spacing>
    </SidebarTemplate>
  );
};
