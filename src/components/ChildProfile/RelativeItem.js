import Avatar from "@atlaskit/avatar";
import Tooltip from "@atlaskit/tooltip";
import React from "react";
import styled from "styled-components";
import { Box, Label, Spacing } from "../ui/atoms";
import { RelativeTooltip } from "./RelativeTooltip";

export const RelativeItem = ({ relative }) => {
  return (
    <Tooltip content={<RelativeTooltip />}>
      <Spacing m={{ l: "10px", b: "22px" }}>
        <Box d="flex" align="center">
          <Avatar
            appearance="circle"
            src="https://pbs.twimg.com/profile_images/803832195970433027/aaoG6PJI_400x400.jpg"
            size="large"
          />
          <Spacing m={{ l: "17px" }}>
            <StyledLabel>Brother</StyledLabel>
            <Text>Bekzat Makhanbet</Text>
          </Spacing>
        </Box>
      </Spacing>
    </Tooltip>
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
  min-width: 119px;
  color: #172b4d;
`;
