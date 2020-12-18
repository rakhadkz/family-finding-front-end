import Button from "@atlaskit/button";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";
import { createContactRequest } from "../../../../api/childContact";
import { constructTree } from "../../../../content/childContact.tree.data";
import { childContactsTableData } from "../../../../content/childContacts.data";
import { contactsTableColumns } from "../../../../content/columns.data";
import { Box, Spacing, Title } from "../../../ui/atoms";
import { ModalDialog } from "../../../ui/common";
import { Table } from "../../../ui/common/Table";
import { AddContactForm } from "../../AddContactForm";
import OrgChart from "./mychart";

export const FamilyTreePage = (props) => {
  const nodes = constructTree(props);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  let { id } = useParams();

  const onAddContact = async (data) => {
    createContactRequest(data)
      .then(() => {
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
  };

  return (
    <Wrapper>
      <Box d="flex" direction="row-reverse">
        <Button appearance="primary">Print</Button>
        <Button appearance="primary">Export</Button>
      </Box>
      <Spacing m={{ b: "20px" }}>
        <OrgChart
          childId={id}
          nodes={nodes}
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
      <Spacing m={{ t: "20px" }}>
        <Table
          items={childContactsTableData(props.contacts)}
          head={contactsTableColumns}
        />
      </Spacing>
      <ModalDialog
        isOpen={isAddModalOpen}
        setIsOpen={setIsAddModalOpen}
        heading="Add Contact"
        appearance="primary"
        body={
          <AddContactForm
            onSubmit={onAddContact}
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
