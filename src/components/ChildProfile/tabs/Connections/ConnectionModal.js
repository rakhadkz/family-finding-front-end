import React, { useEffect, useReducer } from "react";
import styled from "styled-components";
import { fetchConnectionsRequest } from "../../../../api/childContact";
import { fetchTemplatesSentByContactId } from "../../../../api/communicationTemplates";
import { connectionAttachmentsRow } from "../../../../content/connectionAttachment.data";
import {
  attachmentReducer,
  fetchAttachmentsFailure,
  fetchAttachmentsRequest,
  fetchAttachmentsSuccess,
  initialState as attachmentInitialState
} from "../../../../reducers/attachment";
import {
  commentReducer,
  fetchCommentsFailure,
  fetchCommentsRequest,
  fetchCommentsSuccess,
  initialState as commentInitialState
} from "../../../../reducers/comment";
import {
  fetchTemplatesFailure,
  fetchTemplatesRequest,
  fetchTemplatesSuccess
} from "../../../../reducers/template/templateActions";
import {
  templateInitialState,
  templateReducer
} from "../../../../reducers/template/templateReducer";
import { Box, Spacing, Title } from "../../../ui/atoms";
import { FitScore } from "../../../ui/molecules";
import { Avatar } from "../../../ui/molecules/Avatar";
import { ConnectionTabs } from "./ConnectionTabs";

export const ConnectionContext = React.createContext();

const ConnectionModal = ({ currentConnection }) => {
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

  useEffect(() => {
    fetchTemplates();
    fetchComments();
    fetchAttachments();
  }, []);

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
    fetchTemplatesSentByContactId(currentConnection.id)
      .then((data) => data && templateDispatch(fetchTemplatesSuccess(data)))
      .catch((e) => e && templateDispatch(fetchTemplatesFailure(e.message)));
  };

  return (
    <ConnectionContext.Provider
      value={{
        attachmentState,
        commentState,
        templateState,
        fetchTemplates,
        fetchComments,
        fetchAttachments,
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
        <Box d="flex">
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
            <Title
              size="28px"
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
          </Box>
        </Spacing>
        <ConnectionTabs currentConnection={currentConnection} />
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
