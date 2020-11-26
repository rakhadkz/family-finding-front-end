import Avatar from "@atlaskit/avatar";
import React from "react";
import styled from "styled-components";
import { Box, Label, Rectangle, Spacing, Title } from "../ui/atoms";

export const ChildInformation = ({ child }) => {
  return (
    <Rectangle>
      <Box d="flex" justify="space-between">
        <Box d="flex">
          <Avatar
            appearance="circle"
            src="https://pbs.twimg.com/profile_images/803832195970433027/aaoG6PJI_400x400.jpg"
            size="large"
          />
          <Spacing m={{ l: "17px" }}>
            <StyledLabel>Full name</StyledLabel>
            <Title size="18px">Bekzat Makhanbet</Title>
          </Spacing>
        </Box>
        <Spacing>
          <StyledLabel>Birth date</StyledLabel>
          <Text>04/20/2015</Text>
        </Spacing>
        <Spacing>
          <StyledLabel>Gender</StyledLabel>
          <Text>Male</Text>
        </Spacing>
        <Spacing>
          <StyledLabel>Race</StyledLabel>
          <Text>White</Text>
        </Spacing>
        <Spacing>
          <StyledLabel>Permamency goal</StyledLabel>
          <Text>Return to parent</Text>
        </Spacing>
        <Spacing>
          <StyledLabel>System status</StyledLabel>
          <Text>in searching</Text>
        </Spacing>
        <Spacing>
          <StyledLabel>Matches</StyledLabel>
          <Text>1</Text>
        </Spacing>
      </Box>
    </Rectangle>
  );
};

const StyledLabel = styled(Label)`
  font-family: Helvetica;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 16px;

  color: #6b778c;
`;

const Text = styled.div`
  font-family: Helvetica;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;

  color: #172b4d;
`;
