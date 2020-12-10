import OrganizationChart from "@dabeng/react-orgchart";
import styled from "styled-components";
import { childContactsTableData } from "../../../../content/childContacts.data";
import { Box, Spacing, Title } from "../../../ui/atoms";
import MyNode from "./MyNode";
import { Table } from "../../../ui/common/Table";
import { contactsTableColumns } from "../../../../content/columns.data";
import Button from "@atlaskit/button";

export const FamilyTreePage = ({ contacts }) => {
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
        <Table
          items={childContactsTableData(contacts)}
          head={contactsTableColumns}
        />
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
