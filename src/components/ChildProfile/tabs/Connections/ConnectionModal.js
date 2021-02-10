import React from "react";
import styled from "styled-components";
import { Box, Spacing, Title } from "../../../ui/atoms";
import { FitScore } from "../../../ui/molecules";
import { Avatar } from "../../../ui/molecules/Avatar";
import { ConnectionTabs } from "./ConnectionTabs";

const ConnectionModal = ({ currentConnection }) => {
  console.log("WWSSS", currentConnection);
  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "20px",
        height: '80vh'
      }}
    >
      {" "}
      <Avatar
        name={
          currentConnection?.contact?.first_name +
          currentConnection?.contact?.last_name
        }
        size="xlarge"
        ratio={1.25}
      />
      <Spacing m={{ t: "10px" }}>
        <Title
          size="24px"
          style={{
            fontWeight: "700",
          }}
        >
          {currentConnection?.contact?.first_name[0]?.toUpperCase() +
            currentConnection?.contact?.first_name?.substring(1)}{" "}
          {currentConnection?.contact?.last_name
            ? currentConnection?.contact?.last_name[0]?.toUpperCase() +
              currentConnection?.contact?.last_name?.substring(1)
            : ""}
        </Title>
      </Spacing>
      <Text>{currentConnection?.contact?.relationship}</Text>
      <FitScore score={Math.floor(Math.random() * 6)} />
      <Spacing m="10px 0">
        <Box d="flex" w="500px" justify="space-between" wrap="wrap">
          <Box mb="20px" w="200px" style={{ fontWeight: "700" }}>
            Email:
            <Box style={{ fontWeight: "500" }}>
              {currentConnection?.contact?.email}
            </Box>
          </Box>
          <Box mb="20px" w="200px" style={{ fontWeight: "700" }}>
            Address:{" "}
            <Box style={{ fontWeight: "500" }}>
              {currentConnection?.contact?.address}
            </Box>
          </Box>
          <Box mb="0px" w="200px" style={{ fontWeight: "700" }}>
            Phone:
            <Box style={{ fontWeight: "500" }}>
              {currentConnection?.contact?.phone}
            </Box>
          </Box>
        </Box>
      </Spacing>
      <ConnectionTabs currentConnection={currentConnection} />
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
