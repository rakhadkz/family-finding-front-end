import Button from "@atlaskit/button";
import MentionIcon from "@atlaskit/icon/glyph/mention";
import React from "react";
import styled from "styled-components";
import { Spacing } from "../ui/atoms";

export const SendEmail = ({ onClick }) => {
  return (
    <React.Fragment>
      <ButtonWrapper>
        <Button appearance="primary" isSelected onClick={onClick}>
          <ButtonContentWrapper>
            <MentionIcon />
            <Spacing m={{ l: "4px" }}>Send Email</Spacing>
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
