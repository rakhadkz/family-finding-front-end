import React, { useEffect, useState } from "react";
import OrganizationChart from "@dabeng/react-orgchart";
import styled from "styled-components";
import { fetchChildren } from "../../../../context/children/childProvider";
import { childContactsTableData } from "../../../../content/childContacts.data";
import { ContactsTable } from "./ContactsTable";
import { Box, Spacing, Title } from "../../../ui/atoms";
import MyNode from "./MyNode";
import Button from "@atlaskit/button";

export const FamilyTreePage = () => {
  const [contacts, setContacts] = useState([]);
  useEffect(() => {
    fetchChildren({ id: 1, view: "contacts" }).then((items) => {
      setContacts(childContactsTableData(items));
    });
  }, []);
  return (
    <Wrapper>
      <Box d="flex" direction="row-reverse">
        <Button appearance="primary">Print</Button>
        <Button appearance="primary">Export</Button>
      </Box>
      <Spacing m={{ b: "20px" }}>
        <OrganizationChart
          datasource={ds}
          collapsible={true}
          chartClass="myChart"
          NodeTemplate={MyNode}
        />
      </Spacing>
      <Title size={"16px"}>Contact List</Title>
      <Spacing m={{ t: "20px" }}>
        <ContactsTable contacts={contacts} />
      </Spacing>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
`;

const ds = () => ({
  id: "1",
  name: "Heidi Dillard",
  title: "Child",
  children: [
    {
      id: "2",
      name: "Inaya Mays",
      title: "Mother",
      children: [
        {
          id: "7",
          name: "Arandeep Reyna",
          title: "Grandfather",
        },
        {
          id: "8",
          name: "Benas Ayers",
          title: "Grandmother",
        },
      ],
    },
    {
      id: "3",
      name: "Dexter Cortes",
      title: "Father",
      children: [
        { id: "4", name: "Elissa Brett", title: "Grandfather" },
        {
          id: "5",
          name: "Fionn Regan",
          title: "Grandmother",
        },
      ],
    },
    { id: "9", name: "Leen Talley", title: "Uncle" },
  ],
});
