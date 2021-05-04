import Button from "@atlaskit/button";
import Textfield from "@atlaskit/textfield";
import Drawer from "@atlaskit/drawer";
import React, { useState } from "react";
import { Box, Label, Spacing, Title } from "../../../ui/atoms";
import { AddContactForm } from "../../AddContactForm";
import { fetchContactsRequest } from "../../../../api/childContact";
import Spinner from "@atlaskit/spinner";
import { Avatar } from "../../../ui/molecules/Avatar";
import { StyledLabel } from "../../ChildInformation";
import styled from "styled-components";
import moment from "moment";
import AddIcon from "@atlaskit/icon/glyph/arrow-right";
import { B400 } from "@atlaskit/theme/colors";
import { SiblingsItem } from "../../SiblingsItem";
import { Rounded } from "../../../ui/molecules/Rounded";

function AddConnectionDrawer({
  isAddModalOpen,
  setIsAddModalOpen,
  onAddContact,
  fetchConnections,
  createChildContact,
}) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  const [contacts, setContacts] = useState([]);

  const handleContactSearch = async () => {
    setIsLoading(true);
    const contactsResult = await fetchContactsRequest(firstName, lastName);
    setContacts(contactsResult);
    setActiveStep(1);
    setIsLoading(false);
  };

  const handleContactSelect = async (contact) => {
    setIsLoading(true);
    await createChildContact(contact);
    setIsAddModalOpen(false);
    setIsLoading(false);
  };

  return (
    <Drawer
      onClose={() => setIsAddModalOpen(false)}
      isOpen={isAddModalOpen}
      width={"wide"}
    >
      {isLoading ? (
        <Spinner />
      ) : (
        <div style={{ paddingRight: 40, paddingTop: 10 }}>
          <Title>{"Add Connection"}</Title>
          {activeStep === 0 && (
            <div style={{ marginTop: 30 }}>
              <Label htmlFor={"first_name"}>First Name</Label>
              <Textfield
                label="First Name"
                name="first_name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <div style={{ marginTop: 15 }} />
              <Label htmlFor={"last_name"}>Last Name</Label>
              <Textfield
                label="Last Name"
                name="last_name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              <Button
                style={{ marginTop: 15 }}
                isDisabled={!firstName || !lastName}
                onClick={handleContactSearch}
                type="submit"
                appearance="primary"
              >
                Next
              </Button>
            </div>
          )}

          {activeStep === 1 && (
            <div style={{ marginTop: 30 }}>
              <p>
                The following connections were found Create a New Connection
                with the name {firstName} {lastName}
              </p>
              <p>
                Do any of the following match the person You are trying to add?
              </p>
              <div style={{ marginTop: 15 }} />
              <div
                style={{
                  maxHeight: 450,
                  overflow: "scroll",
                  border: "1px solid #CCC",
                  borderRadius: 4,
                  padding: 15,
                  boxSizing: "border-box",
                }}
              >
                {contacts.map((item) => (
                  <Spacing m={{ l: "10px", b: "22px" }} style={{paddingBottom: 10, borderBottom: '1px solid #ccc'}}>
                    <Box d="flex" align="center">
                      <Avatar name={`${item?.first_name} ${item?.last_name}`} />
                      <Spacing m={{ l: "17px" }} style={{ minWidth: 250 }}>
                        <Text>{`${item?.first_name || ""} ${
                          item?.last_name || ""
                        }`}</Text>
                        <StyledLabel>
                          {item?.city}, {item?.state}
                        </StyledLabel>{" "}
                        <StyledLabel>
                          {moment(item?.birthday).format("MM/DD/YYYY")}
                        </StyledLabel>{" "}
                        <StyledLabel>
                          Age:{" "}
                          {`${Math.floor(
                            (Date.now() - new Date(item?.birthday)) /
                              31536000000
                          )}`}
                        </StyledLabel>
                      </Spacing>
                      <Spacing m={{ l: "17px" }}></Spacing>
                      <Button onClick={() => handleContactSelect(item)}>
                        <AddIcon size="small" primaryColor={B400} />
                      </Button>
                    </Box>
                    <div style={{ marginTop: 15 }} />
                    {item?.child_contacts?.length > 0 && (
                      <StyledLabel>Associated children: </StyledLabel>
                    )}
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                      }}
                    >
                      {item?.child_contacts &&
                        item?.child_contacts[0]?.children.map((child) => (
                          <div
                            style={{
                              minWidth: 200,
                              maxWidth: 200,
                              overflow: "scroll",
                              marginRight: 10,
                            }}
                          >
                            <Rounded
                              content={
                                <>
                                  <Avatar
                                    size="small"
                                    name={`${child?.first_name} ${child?.last_name}`}
                                    isChild
                                  />
                                  <span
                                    style={{
                                      marginLeft: "5px",
                                      color: "#455670",
                                    }}
                                  >
                                    {child?.first_name} {child?.last_name}
                                  </span>
                                </>
                              }
                            />
                          </div>
                        ))}
                    </div>
                  </Spacing>
                ))}
              </div>
              <Button
                style={{ marginTop: 15 }}
                isDisabled={!firstName || !lastName}
                onClick={() => setActiveStep(2)}
                type="submit"
                appearance="primary"
              >
                Create a New Connection
              </Button>
            </div>
          )}

          {activeStep === 2 && (
            <>
              <AddContactForm
                onSubmit={async (data, emails, phones, address, removeIds) => {
                  console.log("DATA", data);
                  await onAddContact(data, emails, phones, address)
                    .then((data) => {
                      console.log(data);
                      setIsAddModalOpen(false);
                    })
                    .finally(() => fetchConnections());
                }}
                onCancel={() => setIsAddModalOpen(false)}
                connection={{
                  contact: { first_name: firstName, last_name: lastName },
                }}
              />
            </>
          )}
        </div>
      )}
    </Drawer>
  );
}

export default AddConnectionDrawer;

const Text = styled.div`
  font-family: Helvetica;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  min-width: 119px;
  color: #172b4d;
`;
