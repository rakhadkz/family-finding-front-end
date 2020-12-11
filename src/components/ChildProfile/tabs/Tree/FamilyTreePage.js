import Button from "@atlaskit/button";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { constructTree } from "../../../../content/childContact.tree.data";
import { childContactsTableData } from "../../../../content/childContacts.data";
import { contactsTableColumns } from "../../../../content/columns.data";
import { Box, Spacing, Title } from "../../../ui/atoms";
import { Table } from "../../../ui/common/Table";
import OrgChart from "./mychart";

export const FamilyTreePage = (props) => {
  const nodes = constructTree(props);
  let { id } = useParams();

  return (
    <Wrapper>
      <Box d="flex" direction="row-reverse">
        <Button appearance="primary">Print</Button>
        <Button appearance="primary">Export</Button>
      </Box>
      <Spacing m={{ b: "20px" }}>
        <OrgChart childId={id} nodes={nodes} />
      </Spacing>
      <Spacing m={{ b: "20px" }}>
        <Title size={"16px"}>Contact List</Title>
      </Spacing>
      <Spacing m={{ t: "20px" }}>
        <Table
          items={childContactsTableData(props.contacts)}
          head={contactsTableColumns}
        />
      </Spacing>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
`;
