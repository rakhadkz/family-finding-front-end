import React from "react";
import styled from "styled-components";
import { Box } from "../atoms";

export const SidebarTemplate = ({ children, sidebar }) => {
  return (
    <Box d="flex">
      <SidebarContainer>{sidebar}</SidebarContainer>
      <ContentContainer>{children}</ContentContainer>
    </Box>
  );
};

const SidebarContainer = styled.div`
  width: 240px;
  flex: 0 0 240px;
  position: sticky;
  top: 0;
  padding: 17px 16px;
  height: 100vh;
  background-color: #f4f5f7;
`;

const ContentContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: 28px 40px;
`;
