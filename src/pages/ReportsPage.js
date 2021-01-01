import React from "react";
import { Box, Spacing, Title } from "../components/ui/atoms";
import { Sidebar } from "../components/ui/common";
import { SidebarTemplate } from "../components/ui/templates";

export const ReportsPage = () => {
  return (
    <SidebarTemplate sidebar={<Sidebar />}>
      <Title>Reports</Title>
      <Spacing m={{ t: "23px" }}>
        <Box d="flex" justify="space-between">
        </Box>
      </Spacing>
      <Spacing m={{ t: "20px" }}>
      </Spacing>
    </SidebarTemplate>
  );
};
