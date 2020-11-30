import React from "react";
import { useHistory } from "react-router-dom";
import { ChildrenSearchBar, ChildrenTable } from "../components/Children";
import { AddChildButton } from "../components/Children/AddChildButton";
import { Box, Spacing, Title } from "../components/ui/atoms";
import { Sidebar } from "../components/ui/common";
import { SidebarTemplate } from "../components/ui/templates";

export const ChildrenPage = () => {
  const history = useHistory();
  return (
    <SidebarTemplate sidebar={<Sidebar />}>
      <Title>Children</Title>
      <Spacing m={{ t: "23px" }}>
        <Box d="flex" justify="space-between">
          <ChildrenSearchBar />
          <AddChildButton onClick={() => history.push("/children/add")} />
        </Box>
      </Spacing>
      <Spacing m={{ t: "20px" }}>
        <ChildrenTable />
      </Spacing>
    </SidebarTemplate>
  );
};
