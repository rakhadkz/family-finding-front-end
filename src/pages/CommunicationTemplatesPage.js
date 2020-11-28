import React from "react";
import { useHistory } from "react-router-dom";
import { Box, Spacing, Title } from "../components/ui/atoms";
import { Sidebar } from "../components/ui/common";
import { SidebarTemplate } from "../components/ui/templates";

export const CommunicationTemplatesPage = () => {
  const history = useHistory();
  return (
    <SidebarTemplate sidebar={<Sidebar />}>
      <Title>Communication Templates</Title>
      <Spacing m={{ t: "23px" }}>
        <Box d="flex" justify="space-between"></Box>
      </Spacing>
      <Spacing m={{ t: "20px" }}></Spacing>
    </SidebarTemplate>
  );
};
