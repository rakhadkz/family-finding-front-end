import { Box, Spacing } from "../components/ui/atoms";
import { FitScore } from "../components/ui/molecules";
import { Avatar } from "../components/ui/molecules/Avatar";
import { updateChildContactConnections } from "../context/children/childProvider";
import { useState, useContext } from "react";
import Switch from "react-switch";
import { ChildContext } from "../pages/ChildProfilePage";
import { postPotentialMatch } from "../reducers/childProfile";
import Button, { ButtonGroup } from "@atlaskit/button";
import EmailIcon from "@atlaskit/icon/glyph/email";
import NotificationIcon from "@atlaskit/icon/glyph/notification-direct";
import AttachmentIcon from "@atlaskit/icon/glyph/attachment";
import CommentIcon from "@atlaskit/icon/glyph/comment";
import DynamicTable from "@atlaskit/dynamic-table";
import EditorCloseIcon from "@atlaskit/icon/glyph/editor/close";
import EditorDoneIcon from "@atlaskit/icon/glyph/editor/done";
import styled from "styled-components";

const ConnectionsTableData = (
  data,
  setIsLoading,
  setIsOpen,
  setCurrent,
  setPlacedContact,
  refresh
) => {
  const { dispatch } = useContext(ChildContext);
  return data
    .filter((item, index) => item?.is_confirmed)
    .sort((item1, item2) => item1?.is_disqualified - item2?.is_disqualified)
    .sort((item1, item2) => item2?.is_placed - item1?.is_placed)
    .map(function (item, index) {
      const onSubmitHandle = async (data) => {
        setIsLoading(true);
        updateChildContactConnections(
          {
            child_contact: {
              is_confirmed: data?.is_confirmed,
              is_placed: data?.is_placed,
              is_disqualified: data?.is_disqualified,
              // potential_match: !item.potential_match,
            },
          },
          item.id
        )
          .then(() => {
            item.is_confirmed = data.is_confirmed;
          })
          .finally(() => {
            setIsLoading(false);
            refresh();
          });
      };

      return {
        key: index,
        cells: [
          {
            key: "full_name",
            content: (
              <Box d="flex">
                <Avatar
                  name={`${item?.contact?.first_name} ${
                    item?.contact ? item?.contact?.last_name : ""
                  }`}
                  size="medium"
                />
                <Box style={{ marginLeft: "8px" }}>
                  <span>
                    <Button
                      appearance="link"
                      onClick={() => {
                        item && setCurrent(item);
                        setIsOpen(true);
                      }}
                      style={{ marginLeft: "-12px" }}
                    >
                      {item?.contact?.first_name[0]?.toUpperCase() +
                        item?.contact?.first_name?.substring(1)}{" "}
                      {item?.contact.last_name
                        ? item?.contact?.last_name[0]?.toUpperCase() +
                          item?.contact?.last_name?.substring(1)
                        : ""}
                    </Button>
                    {item?.is_disqualified && (
                      <Box d="f">
                        <Text>(DISQUALIFIED)</Text>
                        <EditorCloseIcon />
                      </Box>
                    )}
                    <Box d="f" style={{ marginLeft: "-45px" }}>
                      <Box d="f" style={{ alignItems: "center" }}>
                        <EditorCloseIcon />
                        <Text>Email</Text>
                      </Box>
                      <Box d="f" style={{ alignItems: "center" }}>
                        <EditorDoneIcon /> <Text>Phone</Text>
                      </Box>
                      <Box d="f" style={{ alignItems: "center" }}>
                        <EditorDoneIcon />
                        <Text>Adress</Text>
                      </Box>
                      <Box
                        d="f"
                        style={{ alignItems: "center", marginLeft: "-5px" }}
                      >
                        <StyledButton appearance="link">
                          <Box d="f" style={{ alignItems: "center" }}>
                            <Box
                              style={{ marginTop: "-2px", marginRight: "2px" }}
                            >
                              <CommentIcon size="small" />
                            </Box>
                            <Text>4 Comments</Text>
                          </Box>
                        </StyledButton>
                      </Box>
                    </Box>
                  </span>
                </Box>
              </Box>
            ),
          },
          {
            key: "relationship",
            content: item?.contact?.relationship,
          },
          {
            key: "info_engagement",
            content: (
              <Spacing m={{ l: "-20px" }}>
                <Box d="f">
                  <Button appearance="link" iconBefore={<EmailIcon />}>
                    5
                  </Button>
                  <Button appearance="link" iconBefore={<NotificationIcon />}>
                    5
                  </Button>
                  <Button appearance="link" iconBefore={<AttachmentIcon />}>
                    5
                  </Button>
                </Box>
              </Spacing>
            ),
          },
          {
            key: "link_score",
            content: (
              <FitScore
                score={
                  item.contact?.score
                    ? item.contact?.score
                    : Math.floor(Math.random() * 6)
                }
              />
            ),
          },
          {
            key: "actions",
            content: !item?.is_disqualified && (
              <ButtonGroup>
                <Button
                  onClick={() =>
                    onSubmitHandle({
                      is_disqualified: item.is_disqualified,
                      is_confirmed: false,
                      is_placed: item.is_placed,
                    })
                  }
                >
                  Unconfirm
                </Button>
                <Button
                  onClick={() =>
                    onSubmitHandle({
                      is_disqualified: true,
                      is_confirmed: item.is_confirmed,
                      is_placed: item.is_placed,
                    })
                  }
                >
                  Disqualify
                </Button>
                <Button
                  onClick={() => {
                    // item && setCurrent(item.contact);
                    item && setPlacedContact(item);
                    onSubmitHandle({
                      is_placed: true,
                      is_disqualified: item.is_disqualified,
                      is_confirmed: item.is_confirmed,
                    });
                    refresh();
                  }}
                >
                  Place
                </Button>
              </ButtonGroup>
            ),
          },
          // {
          //   key: "potential_match",
          //   content: (
          //     <Box
          //       d="flex"
          //       style={{
          //         marginTop: "10px",
          //         marginLeft: "30px",
          //       }}
          //     >
          //       <Switch
          //         id="potential_match"
          //         checked={item.potential_match}
          //         onChange={onSubmitHandle}
          //         onColor="#3182ce"
          //         borderRadius={30}
          //         handleDiameter={20}
          //         uncheckedIcon={false}
          //         checkedIcon={false}
          //         boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
          //         activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
          //         height={14}
          //         width={35}
          //       />
          //     </Box>
          //   ),
          // },
        ],
      };
    });
};

const PossibleConnectionsTableData = (
  data,
  setIsLoading,
  setIsOpen,
  setCurrent,
  refresh,
  setIsConfirmOpen
) => {
  const { dispatch } = useContext(ChildContext);
  return data
    .filter((item, index) => !item?.is_confirmed)
    .map(function (item, index) {
      const onSubmitHandle = async (data) => {
        setIsLoading(true);
        updateChildContactConnections(
          {
            child_contact: {
              is_confirmed: data?.is_confirmed,
              is_placed: data?.is_placed,
              is_disqualified: data?.is_disqualified,
              // potential_match: !item.potential_match,
            },
          },
          item.id
        )
          .then(() => {
            item.is_confirmed = data.is_confirmed;
          })
          .finally(() => {
            setIsConfirmOpen(false);
            setIsLoading(false);
            refresh();
          });
      };

      return {
        key: index,
        cells: [
          {
            key: "full_name",
            content: (
              <Box d="flex" align="center">
                <Avatar
                  name={`${item?.contact?.first_name} ${
                    item?.contact ? item?.contact?.last_name : ""
                  }`}
                  size="medium"
                />
                <span style={{ marginLeft: "8px" }}>
                  <Button
                    appearance="link"
                    onClick={() => {
                      item && setCurrent(item);
                      setIsOpen(true);
                    }}
                    style={{ marginLeft: "-12px" }}
                  >
                    {item?.contact?.first_name[0]?.toUpperCase() +
                      item?.contact?.first_name?.substring(1)}{" "}
                    {item?.contact.last_name
                      ? item?.contact?.last_name[0]?.toUpperCase() +
                        item?.contact?.last_name?.substring(1)
                      : ""}
                  </Button>
                </span>
              </Box>
            ),
          },
          {
            key: "relationship",
            content: item?.contact?.relationship,
          },
          {
            key: "engagement",
            content: (
              <Spacing m={{ l: "-10px" }}>
                <Box d="f">
                  <Button appearance="link" iconBefore={<EmailIcon />}>
                    5
                  </Button>
                  <Button appearance="link" iconBefore={<NotificationIcon />}>
                    5
                  </Button>
                  <Button appearance="link" iconBefore={<AttachmentIcon />}>
                    5
                  </Button>
                </Box>
              </Spacing>
            ),
          },
          {
            key: "actions",
            content: (
              <ButtonGroup>
                <Button
                  onClick={() => {
                    setIsConfirmOpen(true);
                    setCurrent(item);
                  }}
                >
                  Confirm
                </Button>
              </ButtonGroup>
            ),
          },
          // {
          //   key: "potential_match",
          //   content: (
          //     <Box
          //       d="flex"
          //       style={{
          //         marginTop: "10px",
          //         marginLeft: "30px",
          //       }}
          //     >
          //       <Switch
          //         id="potential_match"
          //         checked={item.potential_match}
          //         onChange={onSubmitHandle}
          //         onColor="#3182ce"
          //         borderRadius={30}
          //         handleDiameter={20}
          //         uncheckedIcon={false}
          //         checkedIcon={false}
          //         boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
          //         activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
          //         height={14}
          //         width={35}
          //       />
          //     </Box>
          //   ),
          // },
        ],
      };
    });
};

const Text = styled.div`
  font-family: Helvetica;
  font-style: normal;
  font-weight: normal;
  font-size: 11px;
  line-height: 25px;
  color: #172b4d;
`;
const StyledButton = styled(Button)`
  font-family: Helvetica;
  font-style: normal;
  font-weight: normal;
  font-size: 11px;
  line-height: 25px;
  color: #172b4d;
`;
export { ConnectionsTableData, PossibleConnectionsTableData };
