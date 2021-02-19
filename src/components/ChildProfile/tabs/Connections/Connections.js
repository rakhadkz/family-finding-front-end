import Button from "@atlaskit/button";
import Drawer from "@atlaskit/drawer";
import AttachmentIcon from "@atlaskit/icon/glyph/attachment";
import CommentIcon from "@atlaskit/icon/glyph/comment";
import EmailIcon from "@atlaskit/icon/glyph/email";
import NotificationIcon from "@atlaskit/icon/glyph/notification-direct";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";
import {
  createContactRequest,
  createTableChildContactRequest,
  updateConnectionRequest,
  updateContactRequest,
} from "../../../../api/childContact";
import {
  confirmedConnectionColumns,
  possibleConnectionColumns,
} from "../../../../content/columns.data";
import { confirmedConnectionRows } from "../../../../content/confirmedConnection.data";
import { possibleConnectionRows } from "../../../../content/possibleConnection.data";
import { relationshipOptions } from "../../../../content/relationshipOptions.data";
import { createChildContact } from "../../../../context/children/childProvider";
import { ChildContext } from "../../../../pages/ChildProfilePage";
import { fetchConnectionsRequest } from "../../../../reducers/connection";
import { Box, Rectangle, Spacing, Title } from "../../../ui/atoms";
import { ModalDialog } from "../../../ui/common";
import { Table } from "../../../ui/common/Table";
import { FitScore } from "../../../ui/molecules";
import { Avatar } from "../../../ui/molecules/Avatar";
import { AddContactForm } from "../../AddContactForm";
import ConnectionModal from "./ConnectionModal";
import { DisqualifyModal } from "./index";

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

export const Connections = () => {
  const [isConnectionModalOpen, setIsConnectionModalOpen] = useState(false);
  const [currentConnection, setCurrentConnection] = useState(null);
  const {
    state,
    connectionState,
    familyTreeState,
    fetchConnections,
    fetchFamilyTree,
    connectionDispatch,
  } = useContext(ChildContext);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDisModalOpen, setIsDisModalOpen] = useState(false);
  const { id } = state.child;
  const { connections } = connectionState;
  const { constructed_tree } = familyTreeState;
  const placedConnection = connections.find((c) => c.is_placed);
  const placedContact = placedConnection?.contact;
  const [currentTab, setCurrentTab] = useState(null);

  useEffect(() => {
    fetchConnections();
  }, []);

  const setPending = () => {
    connectionDispatch(fetchConnectionsRequest());
  };

  const onConfirmUpdate = (connection_id, is_confirmed = true) => {
    setPending();
    updateConnectionRequest(connection_id, {
      is_confirmed: is_confirmed,
    })
      .then(() => fetchConnections())
      .finally(() => setIsConfirmModalOpen(false));
  };

  const onAddContact = async (data) => {
    await createContactRequest(data)
      .then((data) => {
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
                let parentNode = constructed_tree.find((item) => {
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
            fetchConnections();
            setIsAddModalOpen(false);
          });
      })
      .finally(() => setIsAddModalOpen(false));
  };

  const openModal = (tab, connection = placedConnection) => {
    setCurrentTab(tab);
    setCurrentConnection(connection);
    setIsConnectionModalOpen(true);
  };

  const allowDisqualifiedConnection = () => {
    updateConnectionRequest(currentConnection.id, {
      disqualify_reason: "",
      is_disqualified: false,
    })
      .then(() => {
        toast.success(`Contact is successfully allowed!`, {
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
        currentConnection.disqualify_reason = "";
        currentConnection.is_disqualified = false;
        fetchConnections();
      });
  };

  return (
    <Box>
      {placedContact && (
        <Box>
          <Spacing m={{ t: "36px" }}>
            <Title>Final Placement</Title>
          </Spacing>
          <Spacing m={{ t: "16px" }}>
            <Rectangle style={{ width: "700px", border: "1px solid #dfe1e6" }}>
              <Box d="flex">
                <Box d="flex" direction="column" align="center" mr="16px">
                  <Avatar
                    name={`${placedContact.first_name} ${placedContact.last_name}`}
                    size="slarge"
                  />
                  <Spacing m={{ t: "20px" }}>
                    <FitScore score={3} />
                  </Spacing>
                  <p>Link Score</p>
                </Box>
                <Box>
                  <Title size="18px">{`${placedContact.first_name} ${placedContact.last_name}`}</Title>
                  <span>{placedConnection.relationship}</span>
                  <Box d="flex" mt="24px">
                    <Button
                      appearance="link"
                      spacing="none"
                      style={{ marginRight: "17px" }}
                      onClick={() => openModal("templates", placedConnection)}
                    >
                      <Box d="flex" align="center">
                        <EmailIcon />
                        <Spacing m={{ l: "4px" }}>
                          {placedConnection.templates_size} contacts
                        </Spacing>
                      </Box>
                    </Button>
                    <Button
                      appearance="link"
                      spacing="none"
                      style={{ marginRight: "17px" }}
                      onClick={() => openModal("comments", placedConnection)}
                    >
                      <Box d="flex" align="center">
                        <CommentIcon />
                        <Spacing m={{ l: "4px" }}>
                          {placedConnection.comments_size} comments
                        </Spacing>
                      </Box>
                    </Button>
                    <Button
                      appearance="link"
                      spacing="none"
                      style={{ marginRight: "17px" }}
                      onClick={() => openModal("attachments", placedConnection)}
                    >
                      <Box d="flex" align="center">
                        <AttachmentIcon />
                        <Spacing m={{ l: "4px" }}>
                          {placedConnection.attachments_size} attachments
                        </Spacing>
                      </Box>
                    </Button>
                    <Button
                      appearance="link"
                      spacing="none"
                      style={{ marginRight: "17px" }}
                      onClick={() => openModal("alerts", placedConnection)}
                    >
                      <Box d="flex" align="center">
                        <NotificationIcon />
                        <Spacing m={{ l: "4px" }}>
                          {placedConnection.alerts_size} link alerts
                        </Spacing>
                      </Box>
                    </Button>
                  </Box>
                  <Box mt="12px">
                    <span style={{ marginRight: "12px" }}>
                      Email: <strong>{placedContact.email}</strong>
                    </span>
                    <span>
                      Phone: <strong>{placedContact.phone}</strong>
                    </span>
                  </Box>
                </Box>
              </Box>
            </Rectangle>
          </Spacing>
        </Box>
      )}

      <Box mt="36px" d="flex" justify="space-between" align="center">
        <Title>Confirmed Connections</Title>
        <Button
          appearance="warning"
          style={{ marginBottom: "10px" }}
          onClick={() => {
            setCurrentConnection(null);
            setIsAddModalOpen(true);
          }}
        >
          Add Connection
        </Button>
      </Box>
      <Spacing m={{ t: "8px" }}>
        <Table
          pending={connectionState.loading}
          head={confirmedConnectionColumns}
          items={confirmedConnectionRows(
            connections,
            setPending,
            openModal,
            setCurrentConnection,
            fetchConnections,
            setIsAddModalOpen,
            setIsDisModalOpen
          )}
        />
      </Spacing>
      <Spacing m={{ t: "36px" }}>
        <Title>Possible Connections</Title>
      </Spacing>
      <Spacing m={{ t: "8px" }}>
        <Table
          pending={connectionState.loading}
          head={possibleConnectionColumns}
          items={possibleConnectionRows(
            connections,
            openModal,
            setCurrentConnection,
            setIsConfirmModalOpen,
            setIsAddModalOpen
          )}
        />
      </Spacing>
      <Drawer
        onClose={() => setIsConnectionModalOpen(false)}
        isOpen={isConnectionModalOpen}
        width={700}
      >
        <ConnectionModal
          currentConnection={currentConnection}
          onCancel={() => setIsConnectionModalOpen(false)}
          currentTab={currentTab}
          fetchConnections={fetchConnections}
          allowDisqualifiedConnection={allowDisqualifiedConnection}
        />
      </Drawer>

      <ModalDialog
        isOpen={isAddModalOpen}
        setIsOpen={setIsAddModalOpen}
        appearance={null}
        width="large"
        body={
          <Box d="flex" direction="column" align="center">
            <Spacing m={{ t: "30px" }}>
              <Title>
                {currentConnection ? "Edit Connection" : "Add Connection"}
              </Title>
            </Spacing>
            <AddContactForm
              onSubmit={async (data) => {
                console.log("DATA", data);
                if (currentConnection) {
                  if (data.relationship) {
                    await updateConnectionRequest(currentConnection.id, {
                      relationship: data.relationship,
                    }).then(() => {
                      fetchConnections();
                      fetchFamilyTree();
                    });
                    //TODO Add update Family Tree Update Request to immediately create a new necessary node
                  }
                  await updateContactRequest({
                    id: currentConnection.contact.id,
                    ...data,
                  })
                    .then(() => fetchConnections())
                    .finally(() => setIsAddModalOpen(false));
                } else {
                  await onAddContact(data).finally(() => fetchConnections());
                }
              }}
              onCancel={() => setIsAddModalOpen(false)}
              contact={currentConnection?.contact}
            />
          </Box>
        }
        hasActions={false}
      />

      <ModalDialog
        isOpen={isConfirmModalOpen}
        setIsOpen={setIsConfirmModalOpen}
        onClick={() => onConfirmUpdate(currentConnection?.id)}
        positiveLabel="Confirm"
        heading="Are you sure?"
        body={`Are you sure ${
          currentConnection?.contact?.first_name +
          " " +
          currentConnection?.contact?.last_name
        } has a kinship connection to this child?`}
        appearance="danger"
      />

      <ModalDialog
        isOpen={isDisModalOpen}
        setIsOpen={setIsDisModalOpen}
        appearance={null}
        width="large"
        body={
          <DisqualifyModal
            onSubmit={updateConnectionRequest}
            id={currentConnection?.id}
            contact={currentConnection?.contact}
            setIsDisModalOpen={setIsDisModalOpen}
            refresh={fetchConnections}
          />
        }
        hasActions={false}
      />
    </Box>
  );
};
