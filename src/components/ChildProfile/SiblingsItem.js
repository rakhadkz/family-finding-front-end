import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Box, Label, Spacing } from "../ui/atoms";
import { Avatar } from "../ui/molecules/Avatar";

export const SiblingsItem = ({ sibling }) => {
  return (
    <Spacing m={{ l: "10px", b: "22px" }}>
      <Box d="flex" align="center">
        <Avatar
          name={`${sibling?.sibling?.first_name} ${sibling?.sibling?.last_name}`}
        />
        <Spacing m={{ l: "17px" }}>
          <StyledLabel>{sibling?.sibling?.permanency_goal}</StyledLabel>
          <Link onClick={() => window.open(`${sibling?.sibling?.id}`)}>
            <Text>{`${sibling?.sibling?.first_name || ""} ${
              sibling?.sibling?.last_name || ""
            }`}</Text>
          </Link>
        </Spacing>
      </Box>
    </Spacing>
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
