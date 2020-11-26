import Button from "@atlaskit/button";
import MobileIcon from "@atlaskit/icon/glyph/mobile";
import React from "react";
import styled from "styled-components";
import { Spacing } from "../ui/atoms";

export const PlaceCall = ({ onClick }) => {
  return (
    <React.Fragment>
      <ButtonWrapper>
        <Button appearance="primary" isSelected onClick={onClick}>
          <ButtonContentWrapper>
            <MobileIcon />
            <Spacing m={{ l: "4px" }}>PlaceCall</Spacing>
          </ButtonContentWrapper>
        </Button>
      </ButtonWrapper>
    </React.Fragment>
  );
};

const ButtonWrapper = styled.div``;

const ButtonContentWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-family: Helvetica;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
`;
