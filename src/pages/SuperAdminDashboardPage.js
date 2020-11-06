import React from "react";
import {
  AddOrganizationButton,
  OrganizationsSearchBar,
  OrganizationsTable,
} from "../components/Organizations";
import { Box, Spacing, Title } from "../components/ui/atoms";
import { Sidebar } from "../components/ui/common";
import { SidebarTemplate } from "../components/ui/templates";

export const SuperAdminDashboardPage = () => {
  return (
    <SidebarTemplate sidebar={<Sidebar />}>
      <Title>Organizations</Title>
      <Spacing m={{ t: "23px" }}>
        <Box d="flex" justify="space-between">
          <OrganizationsSearchBar />
          <AddOrganizationButton />
        </Box>
      </Spacing>
      <Spacing m={{ t: "20px" }}>
        <OrganizationsTable />
      </Spacing>
    </SidebarTemplate>
  );
};
