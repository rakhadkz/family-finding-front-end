import React, { useState, useContext } from "react";
import { Box, Label, Rectangle, Spacing, Title } from "../../../ui/atoms";
import { Avatar } from "../../../ui/molecules/Avatar";
import { FitScore } from "../../../ui/molecules";
import styled from "styled-components";
import EmailIcon from "@atlaskit/icon/glyph/email";
import NotificationIcon from "@atlaskit/icon/glyph/notification-direct";
import AttachmentIcon from "@atlaskit/icon/glyph/attachment";
import CommentIcon from "@atlaskit/icon/glyph/comment";
import DynamicTable from "@atlaskit/dynamic-table";
import { ModalDialog, TableWrapper } from "../../../ui/common";
import { ChildContext } from "../../../../pages/ChildProfilePage";
import {
  ConnectionsTableData,
  PossibleConnectionsTableData,
} from "../../../../content/connections.data";
import Button, { ButtonGroup } from "@atlaskit/button";
import { AddContactForm } from "../../AddContactForm";
import { toast } from "react-toastify";
import {
  createContactRequest,
  createTableChildContactRequest,
} from "../../../../api/childContact";
import { relationshipOptions } from "../../../../content/relationshipOptions.data";
import { createChildContact } from "../../../../context/children/childProvider";
import ConnectionModal from "./ConnectionModal";
import { updateChildContactConnections } from "../../../../context/children/childProvider";

const columns = [
  {
    key: "full_name",
    content: "Full Name",
    width: 25,
  },
  {
    key: "relationship",
    content: "Relationship",
    width: 10,
  },
  {
    key: "info_engagement",
    content: "Info & Engagement",
    width: 18,
  },
  {
    key: "link_score",
    content: "Link Score",
    width: 13,
  },
  {
    key: "actions",
    content: "Actions",
    width: 25,
  },
];

const columnsPossible = [
  {
    key: "full_name",
    content: "Full Name",
    width: 25,
  },
  {
    key: "relationship",
    content: "Relationship",
    width: 12,
  },
  {
    key: "engagement",
    content: "Engagement",
    width: 18,
  },
  {
    key: "actions",
    content: "Actions",
    width: 18,
  },
];

export const ConnectionsNew = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const { state, dispatch } = useContext(ChildContext);
  const { id, contacts } = state.child;
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isConOpen, setIsConOpen] = useState(false);
  const [currentConnection, setCurrentConnection] = useState(null);
  const [placedContact, setPlacedContact] = useState(
    contacts.find((c) => c.is_placed)
  );
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const onAddContact = async (data) => {
    await createContactRequest(data)
      .then((data) => {
        console.log("RESULT", data);
        createTableChildContactRequest({
          child_id: id,
          contact_id: data.id,
        })
          .then(async () => {
            if (data.relationship) {
              const { parent } = relationshipOptions.find(
                (item) => item.value === data.relationship
              );
              console.log("PARENT", parent);
              if (
                data.relationship === "Mother" ||
                data.relationship === "Father"
              ) {
                await createChildContact({
                  child_tree_contact: {
                    child_id: id,
                    parent_id: 0,
                    contact_id: data.id,
                    relationship: data.relationship,
                  },
                });
              } else if (parent) {
                let parentNode = props.treeContacts.find((item) => {
                  console.log(item);
                  return item.Relationship === parent;
                });
                console.log("PARENT NODE", parentNode);

                if (!parentNode) {
                  if (parent === "Child") {
                    parentNode = { id: 0 };
                  } else {
                    parentNode = await createChildContact({
                      child_tree_contact: {
                        child_id: id,
                        parent_id: 0,
                        relationship: parent,
                      },
                    });
                  }
                }

                await createChildContact({
                  child_tree_contact: {
                    child_id: id,
                    parent_id: parentNode.id,
                    contact_id: data.id,
                    relationship: data.relationship,
                  },
                });
              }
            }
            toast.success("User successfully created!", {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          })
          .finally(() => {
            props.refreshContacts((prev) => !prev);
            setIsAddModalOpen(false);
          });
      })
      .finally(() => setIsAddModalOpen(false));
  };

  const onSubmitHandle = async (data) => {
    console.log(currentConnection);
    setIsLoading(true);
    updateChildContactConnections(
      {
        child_contact: {
          is_confirmed: true,
        },
      },
      currentConnection.id
    )
      .then(() => {
        currentConnection.is_confirmed = true;
        // item.is_confirmed = data.is_confirmed;
      })
      .finally(() => {
        setIsConfirmOpen(false);
        setIsLoading(false);
        // refresh();
      });
  };

  const onConfirm = () => {};

  return (
    <Box>
      {placedContact ? (
        <Box>
          <Title
            size="24px"
            style={{
              marginTop: "25px",
              marginBottom: "25px",
              fontWeight: "500",
            }}
          >
            Final Placement
          </Title>
          <Rectangle style={{ width: "800px", border: "1px solid #dfe1e6" }}>
            <Box d="f">
              <Box
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  alignContent: "center",
                  // margin: "20px",
                  marginRight: "10px",
                  marginBottom: "5px",
                }}
              >
                <Spacing m={{ b: "20px" }}>
                  <Avatar
                    name={`${placedContact.contact.first_name} ${placedContact.contact.last_name}`}
                    size="slarge"
                  />
                </Spacing>
                <FitScore score={Math.floor(Math.random() * 6)} />
                <Title
                  size="14px"
                  style={{ marginRight: "5px", fontWeight: "normal" }}
                >
                  Link Score
                </Title>
              </Box>
              <Box>
                <Title
                  size="18px"
                  style={{ marginLeft: "5px", marginBottom: "5px" }}
                >
                  {`${placedContact.contact.first_name} ${
                    placedContact.contact.last_name
                      ? placedContact.contact.last_name
                      : ""
                  }`}
                </Title>
                <Text style={{ marginBottom: "15px", marginLeft: "5px" }}>
                  {placedContact.contact.relationship}
                </Text>
                <Spacing m={{ l: "-10px" }}>
                  <Box d="f">
                    <Button appearance="link" iconBefore={<EmailIcon />}>
                      5 contacts
                    </Button>
                    <Button appearance="link" iconBefore={<CommentIcon />}>
                      5 comments
                    </Button>
                    <Button appearance="link" iconBefore={<NotificationIcon />}>
                      5 link alerts
                    </Button>
                  </Box>
                </Spacing>
                <Spacing m="5px">
                  <Box d="f">
                    <Text
                      style={{
                        fontWeight: "700",
                        marginRight: "20px",
                        display: "flex",
                      }}
                    >
                      Email:
                      <Text style={{ fontWeight: "500" }}>
                        {placedContact.contact.email}
                      </Text>
                    </Text>
                    <Text style={{ fontWeight: "700", display: "flex" }}>
                      Phone:{"   "}
                      <Text style={{ fontWeight: "500" }}>
                        {placedContact.contact.phone}
                      </Text>
                    </Text>
                  </Box>
                </Spacing>
              </Box>
            </Box>
          </Rectangle>
        </Box>
      ) : null}
      <Spacing m={{ t: "20px" }}>
        <Box d="f" justify="space-between">
          <Title
            size="24px"
            style={{
              marginTop: "25px",
              marginBottom: "25px",
              fontWeight: "500",
            }}
          >
            Confirmed Connections
          </Title>

          <Spacing m={{ t: "20px" }}>
            <Box d="flex" justify="flex-end">
              <Button
                appearance="warning"
                onClick={() => setIsAddModalOpen(true)}
              >
                Add Connection
              </Button>
            </Box>
          </Spacing>
        </Box>
        <TableWrapper>
          <DynamicTable
            head={{ cells: columns }}
            loadingSpinnerSize="large"
            isLoading={isLoading}
            rows={ConnectionsTableData(
              contacts,
              setIsLoading,
              setIsConOpen,
              setCurrentConnection,
              setPlacedContact,
              props.refreshContacts
            )}
            isFixedSize
            emptyView="Not found"
          />
        </TableWrapper>
      </Spacing>
      <Spacing m={{ t: "20px" }}>
        <Title
          size="24px"
          style={{
            marginTop: "25px",
            marginBottom: "25px",
            fontWeight: "500",
          }}
        >
          Possible Connections
        </Title>
        <TableWrapper>
          <DynamicTable
            head={{ cells: columnsPossible }}
            loadingSpinnerSize="large"
            isLoading={isLoading}
            rows={PossibleConnectionsTableData(
              contacts,
              setIsLoading,
              setIsConOpen,
              setCurrentConnection,
              props.refreshContacts,
              setIsConfirmOpen
            )}
            isFixedSize
            emptyView="Not found"
          />
        </TableWrapper>
      </Spacing>
      <ModalDialog
        isOpen={isAddModalOpen}
        setIsOpen={setIsAddModalOpen}
        heading="Add Connection"
        appearance={null}
        body={
          <AddContactForm
            onSubmit={async (data) => {
              console.log("DATA", data);
              await onAddContact(data).finally(props.refreshContacts);
              console.log("FETCHING");
            }}
            onCancel={() => setIsAddModalOpen(false)}
          />
        }
        hasActions={false}
      />
      <ModalDialog
        isOpen={isConOpen}
        setIsOpen={setIsConOpen}
        // heading={
        //   currentConnection?.contact?.first_name +
        //   " " +
        //   currentConnection?.contact?.last_name
        // }
        appearance={null}
        body={
          <ConnectionModal
            currentConnection={currentConnection}
            onCancel={() => setIsConOpen(false)}
          />
        }
        width="x-large"
        hasActions={false}
      />
      <ModalDialog
        isOpen={isConfirmOpen}
        setIsOpen={setIsConfirmOpen}
        onClick={() => onSubmitHandle(false)}
        positiveLabel="Delete"
        heading="Are you sure?"
        body={`Are you sure ${
          currentConnection?.contact?.first_name +
          " " +
          currentConnection?.contact?.last_name
        } has a kinship connection to this child?`}
        appearance="danger"
      />
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
