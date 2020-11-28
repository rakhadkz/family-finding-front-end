import Avatar from "@atlaskit/avatar";
import { TooltipPrimitive } from "@atlaskit/tooltip";
import React from "react";
import styled from "styled-components";
import { Box, Label, Rectangle, Spacing, Title } from "../ui/atoms";

export const RelativeTooltip = ({ relative }) => {
  return (
    <CustomTooltip>
      <Rectangle>
        <Box d="flex" align="flex-start">
          <Avatar
            appearance="circle"
            src="https://pbs.twimg.com/profile_images/803832195970433027/aaoG6PJI_400x400.jpg"
            size="xlarge"
          />
          <Spacing m={{ l: "17px" }}>
            <StyledLabel>Brother</StyledLabel>
            <Title>Bekzat Makhanbet</Title>
            <Text>650-496-0528</Text>
            <Text>8ahmed.emad6@dankq.com</Text>
            <Spacing m={{ t: "16px" }}>
              <Text>326 Thunder Road, LUNING, Nevada, 89420</Text>
            </Spacing>
          </Spacing>
        </Box>
      </Rectangle>
    </CustomTooltip>
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

const CustomTooltip = styled(TooltipPrimitive)`
  background: white;
  border-radius: 4px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  box-sizing: content-box;
  color: #333;
  width: 405px;
  margin-left: -10px;
  margin-top: -5px;
  margin-bottom: -5px;
  height: 105%;
`;
