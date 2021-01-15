import moment from "moment";
import React, { memo } from "react";
import styled from "styled-components";
import { Box, Label, Rectangle, Spacing, Title } from "../ui/atoms";
import { Avatar } from "../ui/molecules/Avatar";

export const ChildInformation = memo(({ child }) => {
  return (
    <Rectangle>
      <Box d="flex" justify="space-between">
        <Box d="flex">
          <Avatar name={`${child.first_name} ${child.last_name}`}/>
          <Spacing m={{ l: "17px" }}>
            <StyledLabel>Full name</StyledLabel>
            <Title size="18px">{child.first_name ? `${child.first_name} ${child.last_name}` : ""}</Title>
          </Spacing>
        </Box>
        <Spacing>
          <StyledLabel>Birth date</StyledLabel>
          <Text>{moment(child.birthday).format('MMMM d, yyyy')}</Text>
        </Spacing>
        <Spacing>
          <StyledLabel>Gender</StyledLabel>
          <Text>{child.gender}</Text>
        </Spacing>
        <Spacing>
          <StyledLabel>Race</StyledLabel>
          <Text>{child.race}</Text>
        </Spacing>
        <Spacing>
          <StyledLabel>Permanency goal</StyledLabel>
          <Text>{child.permanency_goal}</Text>
        </Spacing>
        <Spacing>
          <StyledLabel>System status</StyledLabel>
          <Text>{child.system_status}</Text>
        </Spacing>
        <Spacing>
          <StyledLabel>Matches</StyledLabel>
          <Text>1</Text>
        </Spacing>
      </Box>
    </Rectangle>
  );
});

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
