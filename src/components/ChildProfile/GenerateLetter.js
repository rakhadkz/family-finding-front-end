import Button from "@atlaskit/button";
import EmailIcon from "@atlaskit/icon/glyph/email";
import Modal, { ModalTransition } from "@atlaskit/modal-dialog";
import React, { useState } from "react";
import styled from "styled-components";
import { Spacing } from "../ui/atoms";

export const GenerateLetter = ({ onClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const close = () => setIsOpen(false);
  const open = () => setIsOpen(true);

  return (
    <React.Fragment>
      <ButtonWrapper>
        <Button appearance="primary" onClick={open} isSelected>
          <ButtonContentWrapper>
            <EmailIcon />
            <Spacing m={{ l: "4px" }}>Generate Letter</Spacing>
          </ButtonContentWrapper>
        </Button>
      </ButtonWrapper>
      <ModalTransition>
        {isOpen && (
          <Modal
            actions={[{ text: "Send", onClick: close }]}
            onClose={close}
            heading="Generate Letter"
            width="medium"
          ></Modal>
        )}
      </ModalTransition>
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
