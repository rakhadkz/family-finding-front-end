import DynamicTable from "@atlaskit/dynamic-table";
import styled from "styled-components";
import { connectionsTableData } from "../../../../content/connections.data";
import { Switch } from "@chakra-ui/switch";
import Button from "@atlaskit/button";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  createContactRequest,
  createTableChildContactRequest,
  updateChildContactRequestConnections,
} from "../../../../api/childContact";
import { relationshipOptions } from "../../../../content/relationshipOptions.data";
import { createChildContact } from "../../../../context/children/childProvider";
import { Box, Spacing, Title, Form } from "../../../ui/atoms";
import { ModalDialog } from "../../../ui/common";
import { AddContactForm } from "../../AddContactForm";
import { useForm } from "react-hook-form";
import { FormSection } from "@atlaskit/form";

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
  const { contacts } = props;
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  let { id } = useParams();
  const {
    register,
    handleSubmit,
    control,
    errors,
    reset,
    formState: { isSubmitSuccessful },
  } = useForm({});

  // const onSubmitHandle = async () => {
  //   setIsLoading(true);
  //   updateChildContactRequestConnections(
  //     {
  //       child_contact: {
  //         potential_match: true,
  //         family_fit_score: 3,
  //       },
  //     }
  //     // item.id
  //   )
  //     .then((items) => {})
  //     .finally(() => {
  //       setIsLoading(false);
  //     });
  // };

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

  return (
    <Spacing m={{ t: "25px" }}>
      <Spacing m={{ b: "20px" }}>
        <Box d="flex" justify="space-between">
          <Title size={"16px"}>Connections List</Title>
          <Button appearance="warning" onClick={() => setIsAddModalOpen(true)}>
            Add Connection
          </Button>
        </Box>
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

      <Form w="100%" onSubmit={() => {}} noValidate>
        <FormSection>
          <TableWrapper>
            <DynamicTable
              control={control}
              register={register}
              head={{ cells: columns }}
              loadingSpinnerSize="large"
              isLoading={isLoading}
              rows={connectionsTableData(contacts, setIsLoading)}
              isFixedSize
            />
          </TableWrapper>
        </FormSection>
      </Form>
    </Spacing>
  );
};

const TableWrapper = styled.div`
  width: 100%;
`;
