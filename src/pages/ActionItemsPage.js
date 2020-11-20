import React from "react";
import { ActionItemsTable } from "../components/ActionItems/ActionItemsTable";
import { Spacing, Title } from "../components/ui/atoms";
import { Sidebar } from "../components/ui/common";
import { SidebarTemplate } from "../components/ui/templates";

export const ActionItemsPage = () => {
  return (
    <SidebarTemplate sidebar={<Sidebar />}>
      <Title>Action Items</Title>
      <Spacing m={{ t: "29px" }}>
        <ActionItemsTable />
      </Spacing>
    </SidebarTemplate>
  );
};
