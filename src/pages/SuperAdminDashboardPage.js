import React from "react";
import { useHistory } from "react-router-dom";
import {
  AddOrganizationButton,
  OrganizationsSearchBar,
  OrganizationsTable,
} from "../components/Organizations";
import { Box, Spacing, Title } from "../components/ui/atoms";
import { Sidebar } from "../components/ui/common";
import { SidebarTemplate } from "../components/ui/templates";

export const SuperAdminDashboardPage = () => {
  const history = useHistory();
  return (
    <SidebarTemplate sidebar={<Sidebar />}>
      <Title>Organizations</Title>
      <Spacing m={{ t: "23px" }}>
        <Box d="flex" justify="space-between">
          <OrganizationsSearchBar />
          <AddOrganizationButton
            onClick={() => history.push("/organizations/add")}
          />
        </Box>
      </Spacing>
      <Spacing m={{ t: "20px" }}>
        <OrganizationsTable />
      </Spacing>
    </SidebarTemplate>
  );
};
