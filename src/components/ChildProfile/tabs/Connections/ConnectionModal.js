import { ButtonGroup } from "@atlaskit/button";
import React, { useContext, useEffect, useReducer, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { fetchConnectionsRequest } from "../../../../api/childContact";
import { connectionAttachmentsRow } from "../../../../content/connectionAttachment.data";
import { ChildContext } from "../../../../pages/ChildProfilePage";
import {
  alertReducer,
  fetchAlertsFailure,
  fetchAlertsRequest,
  fetchAlertsSuccess,
  initialState as alertInitialState,
} from "../../../../reducers/alertLinks";
import {
  attachmentReducer,
  fetchAttachmentsFailure,
  fetchAttachmentsRequest,
  fetchAttachmentsSuccess,
  initialState as attachmentInitialState,
} from "../../../../reducers/attachment";
import {
  commentReducer,
  fetchCommentsFailure,
  fetchCommentsRequest,
  fetchCommentsSuccess,
  initialState as commentInitialState,
} from "../../../../reducers/comment";
import {
  fetchTemplatesFailure,
  fetchTemplatesRequest,
  fetchTemplatesSuccess,
} from "../../../../reducers/template/templateActions";
import {
  templateInitialState,
  templateReducer,
} from "../../../../reducers/template/templateReducer";
import { Box, Spacing, Title } from "../../../ui/atoms";
import { FitScore } from "../../../ui/molecules";
import { Avatar } from "../../../ui/molecules/Avatar";
import { Rounded } from "../../../ui/molecules/Rounded";
import { ConnectionTabs } from "./ConnectionTabs";
import Button from "@atlaskit/button";
import Badge from "@atlaskit/badge";

export const ConnectionContext = React.createContext();

const ConnectionModal = ({
  currentConnection,
  currentTab,
  fetchConnections,
  setIsConnectionModalOpen,
  allowDisqualifiedConnection,
}) => {
  const { setCurrentCommentId } = useContext(ChildContext);
  const [alertsState, alertDispatch] = useReducer(
    alertReducer,
    alertInitialState
  );
  const [attachmentState, attachmentDispatch] = useReducer(
    attachmentReducer,
    attachmentInitialState
  );
  const [commentState, commentDispatch] = useReducer(
    commentReducer,
    commentInitialState
  );
  const [templateState, templateDispatch] = useReducer(
    templateReducer,
    templateInitialState
  );

  const history = useHistory();

  useEffect(() => {
    console.log("Connected children: ", currentConnection);
    setCurrentCommentId(null);
    fetchTemplates();
    fetchComments();
    fetchAttachments();
    fetchAlerts();
  }, []);

  const fetchAlerts = () => {
    alertDispatch(fetchAlertsRequest());
    fetchConnectionsRequest({ id: currentConnection.id, view: "alerts" })
      .then((data) => {
        data && data.alerts && alertDispatch(fetchAlertsSuccess(data.alerts));
        console.log("=======================", data.alerts);
      })
      .catch((e) => e && alertDispatch(fetchAlertsFailure(e.message)));
  };

  const fetchAttachments = () => {
    attachmentDispatch(fetchAttachmentsRequest());
    fetchConnectionsRequest({ id: currentConnection.id, view: "attachments" })
      .then(
        (data) =>
          data &&
          data.attachments &&
          attachmentDispatch(
            fetchAttachmentsSuccess(connectionAttachmentsRow(data.attachments))
          )
      )
      .catch(
        (e) => e && attachmentDispatch(fetchAttachmentsFailure(e.message))
      );
  };

  const fetchComments = () => {
    commentDispatch(fetchCommentsRequest());
    fetchConnectionsRequest({ id: currentConnection.id, view: "comments" })
      .then(
        (data) =>
          data &&
          data.comments &&
          commentDispatch(fetchCommentsSuccess(data.comments))
      )
      .catch((e) => e && commentDispatch(fetchCommentsFailure(e.message)));
  };

  const fetchTemplates = () => {
    templateDispatch(fetchTemplatesRequest());
    fetchConnectionsRequest({ id: currentConnection.id, view: "templates" })
      .then(
        (data) =>
          data &&
          data.templates &&
          templateDispatch(fetchTemplatesSuccess(data.templates))
      )
      .catch((e) => e && templateDispatch(fetchTemplatesFailure(e.message)));
  };

  return (
    <ConnectionContext.Provider
      value={{
        alertsState,
        attachmentState,
        commentState,
        templateState,
        fetchAlerts,
        fetchTemplates,
        fetchComments,
        fetchAttachments,
        fetchConnections,
        setIsConnectionModalOpen,
      }}
    >
      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          marginTop: "20px",
          height: "80vh",
          width: 700,
        }}
      >
        <Box d="flex" style={{ justifyContent: "space-between" }}>
          <Box d="f">
            <Box
              w="150px"
              d="flex"
              direction="column"
              align="center"
              justify="center"
            >
              <Avatar
                name={
                  currentConnection?.contact?.first_name +
                  currentConnection?.contact?.last_name
                }
                size="xlarge"
                ratio={1.25}
              />
            </Box>
            <Spacing m={{ t: "10px" }}>
              <Box d="flex" direction="column" align="flex-start">
                <Title
                  size="28px"
                  style={{
                    fontWeight: "700",
                    marginBottom: 15,
                  }}
                >
                  {currentConnection?.contact?.first_name[0]?.toUpperCase() +
                    currentConnection?.contact?.first_name?.substring(1)}{" "}
                  {currentConnection?.contact?.last_name
                    ? currentConnection?.contact?.last_name[0]?.toUpperCase() +
                      currentConnection?.contact?.last_name?.substring(1)
                    : ""}
                </Title>
                {currentConnection.is_disqualified ? (
                  <Badge appearance="important">{"DISQUALIFIED"}</Badge>
                ) : null}
              </Box>
              <Spacing m={{ t: "10px" }}>
                <FitScore score={Math.floor(Math.random() * 6)} />
              </Spacing>

              <Spacing m={{ t: "10px" }}>
                <Text style={{ fontSize: 15 }}>
                  {currentConnection?.contact?.relationship}
                </Text>
              </Spacing>
            </Spacing>
          </Box>
        </Box>

        <Spacing m="30px 40px">
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
            <Box mb="0px" w="200px" style={{ fontWeight: "700" }}>
              {currentConnection.is_disqualified ? (
                <Box>
                  <Button
                    onClick={allowDisqualifiedConnection}
                    appearance="warning"
                  >
                    Remove Disqualification
                  </Button>
                </Box>
              ) : null}
            </Box>
          </Box>
        </Spacing>
        <Box d="flex">
          <ButtonGroup>
            {currentConnection.children.map((child) => (
              <Rounded
                onClick={() => history.push("../children/" + child.id)}
                content={
                  <>
                    <Avatar
                      size="small"
                      name={`${child.first_name} ${child.last_name}`}
                    />
                    <span style={{ marginLeft: "5px", color: "#455670" }}>
                      {child.first_name} {child.last_name}
                    </span>
                  </>
                }
              />
            ))}
          </ButtonGroup>
        </Box>
        <div style={{ width: 650 }}>
          <ConnectionTabs
            currentConnection={currentConnection}
            currentTab={currentTab}
            setCurrentCommentId={setCurrentCommentId}
          />
        </div>
      </Box>
    </ConnectionContext.Provider>
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
