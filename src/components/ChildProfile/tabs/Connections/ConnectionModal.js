import React, { useState, useContext } from "react";
import { Box, Label, Rectangle, Spacing, Title } from "../../../ui/atoms";
import { Avatar } from "../../../ui/molecules/Avatar";
import { FitScore } from "../../../ui/molecules";
import styled from "styled-components";
import EmailIcon from "@atlaskit/icon/glyph/email";
import NotificationIcon from "@atlaskit/icon/glyph/notification-direct";
import AttachmentIcon from "@atlaskit/icon/glyph/attachment";
import CommentIcon from "@atlaskit/icon/glyph/comment";
import Button, { ButtonGroup } from "@atlaskit/button";

const ConnectionModal = ({ currentConnection }) => {
  console.log(currentConnection);
  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {" "}
      <Avatar
        name={currentConnection?.first_name + currentConnection?.last_name}
        size="xlarge"
        ratio={1.25}
      />
      <Title
        size="24px"
        style={{
          fontWeight: "700",
          marginLeft: "5px",
          marginBottom: "5px",
          marginTop: "20px",
        }}
      >
        {currentConnection?.first_name[0]?.toUpperCase() +
          currentConnection?.first_name?.substring(1)}{" "}
        {currentConnection?.last_name[0]?.toUpperCase() +
          currentConnection?.last_name?.substring(1)}
      </Title>
      <Text
        style={{ marginTop: "20px", marginBottom: "15px", marginLeft: "5px" }}
      >
        {currentConnection?.relationship}
      </Text>
      <FitScore score={Math.floor(Math.random() * 6)} />
      <Box
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "row",
          marginTop: "50px",
          marginBottom: "50px",
          width: "400px",
          flexWrap: "wrap",
        }}
      >
        <Box
          style={{ width: "200px", fontWeight: "700", marginBottom: "20px" }}
        >
          Email:
          <Box style={{ fontWeight: "500" }}>{currentConnection?.email}</Box>
        </Box>
        <Box
          style={{ width: "200px", fontWeight: "700", marginBottom: "20px" }}
        >
          Address:{" "}
          <Box style={{ fontWeight: "500" }}>{currentConnection?.address}</Box>
        </Box>
        <Box
          style={{ width: "200px", fontWeight: "700", marginBottom: "20px" }}
        >
          Phone:
          <Box style={{ fontWeight: "500" }}>{currentConnection?.phone}</Box>
        </Box>
      </Box>
      <div
        style={{
          borderTop: "2px solid #fff ",
          borderColor: "#000000",

          marginLeft: 20,
          marginRight: 20,
          width: "500px",
          color: "#000000",
        }}
      ></div>
      <Spacing m={{ l: "-10px", b: "200px" }}>
        <Box d="f">
          <Button appearance="link" iconBefore={<NotificationIcon />}>
            5 link alerts
          </Button>
          <Button appearance="link" iconBefore={<EmailIcon />}>
            5 contacts
          </Button>
          <Button appearance="link" iconBefore={<CommentIcon />}>
            5 comments
          </Button>
          <Button appearance="link" iconBefore={<AttachmentIcon />}>
            5 attachments
          </Button>
        </Box>
      </Spacing>
    </Box>
  );
};
const Text = styled.div`
  font-family: Helvetica;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  color: #172b4d;
`;

export default ConnectionModal;
