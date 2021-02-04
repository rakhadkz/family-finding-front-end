import Button from "@atlaskit/button";
import DynamicTable from "@atlaskit/dynamic-table";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  createContactRequest,
  createTableChildContactRequest,
  updateContactChildRequest,
  updateContactRequest
} from "../../../../api/childContact";
import { connectionsTableData } from "../../../../content/connections.data";
import { relationshipOptions } from "../../../../content/relationshipOptions.data";
import { createChildContact } from "../../../../context/children/childProvider";
import { Box, Spacing } from "../../../ui/atoms";
import { ModalDialog, TableWrapper } from "../../../ui/common";
import { AddContactForm } from "../../AddContactForm";

const columns = [
  {
    key: "full_name",
    content: "Full Name",
    width: 18,
  },
  {
    key: "relationship",
    content: "Relationship",
    width: 11,
  },
  {
    key: "phone",
    content: "Phone Number",
    width: 17,
  },
  {
    key: "email",
    content: "Email",
    width: 20,
  },
  {
    key: "fit_score",
    content: "Family Fit Score",
    width: 15,
  },
  {
    key: "potential_match",
    content: "Potential Match",
    width: 16,
  },
];

export const Connections = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const { contacts, setContacts } = props;
  const [ isAddModalOpen, setIsAddModalOpen ] = useState(false);
  const [ isDisqualifyModalOpen, setIsDisqualifyModalOpen ] = useState(false)
  let { id } = useParams();
  const [ currentContact, setCurrentContact ] = useState(null)

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
          .finally(() => {
            props.refreshContacts((prev) => !prev);
            setIsAddModalOpen(false);
          });
      })
      .finally(() => setIsAddModalOpen(false));
  };

  return (
    <>
      <Spacing m={{ t: "25px" }}>
        <Spacing m={{ b: "20px" }}>
          <Box d="flex" justify="flex-end">
            <Button
              appearance="warning"
              onClick={() => {
                setCurrentContact(null)
                setIsAddModalOpen(true)
              }}
            >
              Add Connection
            </Button>
          </Box>
        </Spacing>
        <ModalDialog
          isOpen={isAddModalOpen}
          setIsOpen={setIsAddModalOpen}
          heading={currentContact ? "Edit Connection" : "Add Connection"}
          appearance={null}
          body={
            <AddContactForm
              onSubmit={async (data) => {
                console.log("DATA", data);
                if(currentContact){
                  await updateContactRequest({id: currentContact.contact.id, ...data}).then(props.refreshContacts).finally(() => setIsAddModalOpen(false))
                }else{
                  await onAddContact(data).finally(props.refreshContacts);
                }
                console.log("FETCHING");
              }}
              onCancel={() => setIsAddModalOpen(false)}
              contact={currentContact?.contact}
            />
          }
          hasActions={false}
        />

        <TableWrapper>
          <DynamicTable
            head={{ cells: columns }}
            loadingSpinnerSize="large"
            isLoading={isLoading}
            rows={connectionsTableData(contacts, setIsLoading, setContacts, setIsAddModalOpen, setIsDisqualifyModalOpen, setCurrentContact)}
            isFixedSize
          />
        </TableWrapper>
        <Button onClick={() => setIsDisqualifyModalOpen(true)}>Click</Button>
        <ModalDialog
          isOpen={isDisqualifyModalOpen}
          setIsOpen={setIsDisqualifyModalOpen}
          heading="Disqualify Connection"
          body={`Are you sure you want to disqualify ${currentContact?.contact?.first_name} ${currentContact?.contact?.last_name} as a placement option for this child?`}
          positiveLabel="Disqualify"
          onClick={() => {
            updateContactChildRequest({ id: currentContact.id, is_disqualified: true }).then(props.refreshContacts).finally(() => setIsDisqualifyModalOpen(false))
          }}
        />
      </Spacing>
    </>
  );
};
