import Button from "@atlaskit/button";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { constructTree } from "../../../../content/childContact.tree.data";
import { childContactsTableData } from "../../../../content/childContacts.data";
import { Box, Spacing, Title } from "../../../ui/atoms";
import { ContactsTable } from "./ContactsTable";
import OrgChart from "./mychart";

export const FamilyTreePage = (props) => {
  console.log(props);
  const nodes = constructTree(props);
  let { id } = useParams();
  console.log(nodes);
  console.log("IDD", id);
  return (
    <Wrapper>
      <Box d="flex" direction="row-reverse">
        <Button appearance="primary">Print</Button>
        <Button appearance="primary">Export</Button>
      </Box>
      <Spacing m={{ b: "20px" }}> </Spacing>
      <Title size={"16px"}>Contact List</Title>
      <Spacing m={{ b: "20px" }}>
        <OrgChart childId={id} nodes={nodes} />
      </Spacing>
      <Spacing m={{ t: "20px" }}>
        <ContactsTable contacts={childContactsTableData(props.contacts)} />
      </Spacing>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
`;
