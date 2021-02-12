import Button, { ButtonGroup } from "@atlaskit/button";
import EmailIcon from "@atlaskit/icon/glyph/email";
import NotificationIcon from "@atlaskit/icon/glyph/notification-direct";
import AttachmentIcon from "@atlaskit/icon/glyph/attachment";
import CommentIcon from "@atlaskit/icon/glyph/comment";
import EditorCloseIcon from "@atlaskit/icon/glyph/editor/close";
import EditorDoneIcon from "@atlaskit/icon/glyph/editor/done";
import EditorEditIcon from "@atlaskit/icon/glyph/editor/edit";
import styled from "styled-components";
import { updateConnectionRequest } from "../api/childContact";
import { Box, Spacing } from "../components/ui/atoms";
import { Avatar } from "../components/ui/molecules/Avatar";
import { FitScore } from "../components/ui/molecules";

export const SmallText = styled.div`
  font-family: Helvetica;
  font-style: normal;
  font-weight: normal;
  font-size: 11px;
  line-height: 25px;
  color: #172b4d;
`;

export const StyledButton = styled(Button)`
  font-family: Helvetica;
  font-style: normal;
  font-weight: normal;
  font-size: 11px;
  line-height: 25px;
  color: #172b4d;
`;

export const confirmedConnectionRows = (
  data,
  setPending,
  setIsConnectionModalOpen,
  setCurrentConnection,
  fetchConnections,
  setIsAddModalOpen
) => {
  const existPlaced = data.find((c) => c.is_placed);
  return data
    .filter((item) => item?.is_confirmed)
    .sort((item1, item2) => item1?.is_disqualified - item2?.is_disqualified)
    .sort((item1, item2) => item2?.is_placed - item1?.is_placed)
    .map((item, index) => {
      const onPlacementUpdate = (is_placed = true) => {
        if (existPlaced && is_placed) {
          return;
        }
        setPending();
        updateConnectionRequest(item.id, {
          is_placed: is_placed,
        }).then(() => fetchConnections());
      };

      const onDisqualifyUpdate = (is_disqualified = true) => {
        setPending();
        updateConnectionRequest(item.id, {
          is_disqualified: is_disqualified,
        }).then(() => fetchConnections());
      };

      const onConfirmUpdate = (is_confirmed = true) => {
        setPending();
        updateConnectionRequest(item.id, {
          is_confirmed: is_confirmed,
        }).then(() => fetchConnections());
      };

      const setCurrentConnectionFunc = (item) => {
        item && setCurrentConnection(item);
        setIsConnectionModalOpen(true);
      };

      return (
        item &&
        item.contact && {
          index: index,
          cells: [
            {
              key: "full_name",
              content: (
                <Box d="flex" direction="column">
                  <Box d="flex" align="center">
                    <Avatar
                      name={`${item.contact.first_name} ${item.contact.last_name}`}
                      size="medium"
                      ratio={0.4}
                    />
                    <Box ml="8px">
                      <Box d="flex" align="center">
                        <Button
                          appearance="link"
                          spacing="none"
                          onClick={() => setCurrentConnectionFunc(item)}
                        >{`${item.contact.first_name} ${item.contact.last_name}`}</Button>
                      </Box>
                      {item.is_disqualified && (
                        <Box d="flex">
                          <SmallText>(DISQUALIFIED)</SmallText>
                          <EditorCloseIcon />
                        </Box>
                      )}
                    </Box>
                  </Box>
                  <Box d="flex" mt="8px">
                    <Box d="flex" mr="4px">
                      {item.contact.email ? (
                        <EditorDoneIcon />
                      ) : (
                        <EditorCloseIcon />
                      )}
                      <SmallText>Email</SmallText>
                    </Box>
                    <Box d="flex" mr="4px">
                      {item.contact.phone ? (
                        <EditorDoneIcon />
                      ) : (
                        <EditorCloseIcon />
                      )}
                      <SmallText>Phone</SmallText>
                    </Box>
                    <Box d="flex" mr="6px">
                      {item.contact.address ? (
                        <EditorDoneIcon />
                      ) : (
                        <EditorCloseIcon />
                      )}
                      <SmallText>Address</SmallText>
                    </Box>
                    <Box d="flex">
                      <StyledButton appearance="link" spacing="none">
                        <Box d="flex" align="center">
                          <CommentIcon size="small" />
                          <SmallText style={{ marginLeft: "4px" }}>
                            {item.comments_size} Comments
                          </SmallText>
                        </Box>
                      </StyledButton>
                    </Box>
                  </Box>
                </Box>
              ),
            },
            {
              key: "relationship",
              content: item.relationship,
            },
            {
              key: "engagement",
              content: (
                <Box d="flex">
                  <Button
                    appearance="link"
                    spacing="none"
                    style={{ marginRight: "17px" }}
                  >
                    <Box d="flex" align="center">
                      <Spacing m={{ r: "4px" }}>{item.templates_size}</Spacing>
                      <EmailIcon />
                    </Box>
                  </Button>
                  <Button
                    appearance="link"
                    spacing="none"
                    style={{ marginRight: "17px" }}
                  >
                    <Box d="flex" align="center">
                      <Spacing m={{ r: "4px" }}>{item.alerts_size}</Spacing>
                      <NotificationIcon />
                    </Box>
                  </Button>
                  <Button appearance="link" spacing="none">
                    <Box d="flex" align="center">
                      <Spacing m={{ r: "4px" }}>
                        {item.attachments_size}
                      </Spacing>
                      <AttachmentIcon />
                    </Box>
                  </Button>
                </Box>
              ),
            },
            {
              key: "link_score",
              content: <FitScore score={4} />,
            },
            {
              key: "actions",
              content: (
                <div align="center">
                  <div style={{ marginBottom: "5px" }}>
                    <ButtonGroup>
                      <Button
                        style={{ marginLeft: "5px" }}
                        onClick={() => {
                          setCurrentConnection(item);
                          setIsAddModalOpen(true);
                        }}
                      >
                        Edit
                      </Button>
                      {item.is_placed ? (
                        <Button onClick={() => onPlacementUpdate(false)}>
                          Remove Placement
                        </Button>
                      ) : item.is_disqualified ? (
                        <Button onClick={() => onConfirmUpdate(false)}>
                          Unconfirm
                        </Button>
                      ) : (
                        <Button onClick={() => onConfirmUpdate(false)}>
                          Unconfirm
                        </Button>
                      )}
                    </ButtonGroup>
                  </div>

                  {item.is_placed ? null : item.is_disqualified ? null : (
                    <ButtonGroup>
                      <Button onClick={() => onDisqualifyUpdate(true)}>
                        Disqualify
                      </Button>
                      {!existPlaced && (
                        <Button onClick={() => onPlacementUpdate()}>
                          Place
                        </Button>
                      )}
                    </ButtonGroup>
                  )}
                </div>
              ),
            },
          ],
        }
      );
    });
};
