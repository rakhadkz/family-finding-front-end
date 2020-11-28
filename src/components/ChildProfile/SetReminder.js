import Button from "@atlaskit/button";
import NotificationIcon from "@atlaskit/icon/glyph/notification-direct";
import Modal, { ModalTransition } from "@atlaskit/modal-dialog";
import React, { useState } from "react";
import styled from "styled-components";
import { Spacing } from "../ui/atoms";

export const SetReminder = ({ onClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const close = () => setIsOpen(false);
  const open = () => setIsOpen(true);

  return (
    <React.Fragment>
      <ButtonWrapper>
        <Button appearance="primary" onClick={open}>
          <ButtonContentWrapper>
            <NotificationIcon />
            <Spacing m={{ l: "6px" }}>Set Reminder</Spacing>
          </ButtonContentWrapper>
        </Button>
      </ButtonWrapper>
      <ModalTransition>
        {isOpen && (
          <Modal
            actions={[{ text: "Set", onClick: close }]}
            onClose={close}
            heading="Set Reminder"
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
