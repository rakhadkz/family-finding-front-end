import Button from "@atlaskit/button";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";
import {
  createContactRequest,
  createTableChildContactRequest
} from "../../../../api/childContact";
import { relationshipOptions } from "../../../../content/relationshipOptions.data";
import { createChildContact } from "../../../../context/children/childProvider";
import { Box, Spacing, Title } from "../../../ui/atoms";
import { ModalDialog } from "../../../ui/common";
import { AddContactForm } from "../../AddContactForm";
import OrgChart from "./mychart";

export const FamilyTreePage = (props) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  let { id } = useParams();

  const onAddContact = async (data) => {
    await createContactRequest(data)
      .then((data) => {
        console.log("RESULT", data);
        createTableChildContactRequest({
          child_id: props.childId,
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
                    child_id: props.childId,
                    parent_id: 0,
                    contact_id: data.id,
                    relationship: data.relationship,
                  },
                });
              } else if (parent) {
                let parentNode = props.contacts.find((item) => {
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
                        child_id: props.childId,
                        parent_id: 0,
                        relationship: parent,
                      },
                    });
                  }
                }

                await createChildContact({
                  child_tree_contact: {
                    child_id: props.childId,
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
          .finally(() => setIsAddModalOpen(false));
      })
      .finally(() => setIsAddModalOpen(false));
  };

  console.log("CONTACTS", props.contacts);

  return (
    <Wrapper>
      {/* <Box d="flex" direction="row-reverse">
        <Button appearance="primary">Print</Button>
        <Button appearance="primary">Export</Button>
      </Box> */}
      <Spacing m={{ b: "20px" }}>
        <OrgChart
          childId={id}
          initialContacts={props.initialContacts}
          nodes={props.contacts}
          refreshContacts={props.refreshContacts}
        />
      </Spacing>
      <Spacing m={{ b: "20px" }}>
        <Box d="flex" justify="space-between">
          <Title size={"16px"}>Contact List</Title>
          <Button appearance="warning" onClick={() => setIsAddModalOpen(true)}>
            Add Contact
          </Button>
        </Box>
      </Spacing>
      <ModalDialog
        isOpen={isAddModalOpen}
        setIsOpen={setIsAddModalOpen}
        heading="Add Contact"
        appearance={null}
        body={
          <AddContactForm
            onSubmit={async (data) => {
              console.log("DATA", data);
              await onAddContact(data).finally(props.refreshContacts);
              console.log("FETCHING");
            }}
            initialValues={props.initialContacts[0].contact}
            onCancel={() => setIsAddModalOpen(false)}
          />
        }
        hasActions={false}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
`;
