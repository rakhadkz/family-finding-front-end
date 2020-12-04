import OrganizationChart from "@dabeng/react-orgchart";
import styled from "styled-components";
import { childContactsTableData } from "../../../../content/childContacts.data";
import { ContactsTable } from "./ContactsTable";
import { Box, Spacing, Title } from "../../../ui/atoms";
import MyNode from "./MyNode";
import Button from "@atlaskit/button";
import { treeData } from "../../../../content/tree.data";
import OrgChart from "./mychart";

export const FamilyTreePage = ({ contacts }) => {
  const draft = [
    {
      relationship: "mother",
      contact: {
        id: 1,
        first_name: "Amangul",
        last_name: "Sanat",
      },
      parent: {},
    },
  ];
  return (
    <Wrapper>
      <Box d="flex" direction="row-reverse">
        <Button appearance="primary">Print</Button>
        <Button appearance="primary">Export</Button>
      </Box>
      <Spacing m={{ b: "20px" }}>
        <OrganizationChart
          datasource={() => treeData(contacts)}
          collapsible={false}
          chartClass="myChart"
          NodeTemplate={MyNode}
        />
      </Spacing>
      <Spacing m={{ b: "20px" }}>
        <OrgChart
          nodes={[
            {
              id: 1,
              tags: ["blue"],
              name: "King George VI",
              img: "https://cdn.balkan.app/shared/f1.png",
            },
            {
              id: 2,
              pid: 1,
              tags: ["partner"],
              name: "Queen Elizabeth",
              title: "The Queen Mother",
              img: "https://cdn.balkan.app/shared/f2.png",
            },
            {
              id: 3,
              pid: 1,
              tags: ["blue"],
              ppid: 2,
              name: "Queen Elizabeth II",
              img: "https://cdn.balkan.app/shared/f5.png",
            },
            {
              id: 4,
              pid: 3,
              tags: ["left-partner"],
              name: "Prince Philip",
              title: "Duke of Edinburgh",
              img: "https://cdn.balkan.app/shared/f3.png",
            },
            {
              id: 5,
              pid: 1,
              ppid: 2,
              name: "Princess Margaret",
              img: "https://cdn.balkan.app/shared/f6.png",
            },
            {
              id: 6,
              pid: 3,
              tags: ["blue"],
              ppid: 4,
              name: "Charles",
              title: "Prince of Wales",
              img: "https://cdn.balkan.app/shared/f8.png",
            },
            {
              id: 7,
              pid: 6,
              tags: ["partner"],
              name: "Diana",
              title: "Princess of Wales",
              img: "https://cdn.balkan.app/shared/f9.png",
            },
            {
              id: 8,
              pid: 6,
              tags: ["partner"],
              name: "Camila",
              title: "Duchess of Cornwall",
              img: "https://cdn.balkan.app/shared/f7.png",
            },
            {
              id: 9,
              pid: 3,
              ppid: 4,
              name: "Anne",
              title: "Princess Royal",
              img: "https://cdn.balkan.app/shared/f10.png",
            },
            {
              id: 10,
              pid: 3,
              ppid: 4,
              name: "Prince Andrew",
              title: "Duke of York",
              img: "https://cdn.balkan.app/shared/f11.png",
            },
            {
              id: 11,
              pid: 3,
              ppid: 4,
              name: "Prince Edward",
              title: "Earl of Wessex",
              img: "https://cdn.balkan.app/shared/f12.png",
            },
            {
              id: 12,
              pid: 6,
              ppid: 7,
              tags: ["blue"],
              name: "Rakhad Toleu",
              title: "Duch of Cambridge",
              img: "https://cdn.balkan.app/shared/f14.png",
            },
            {
              id: 13,
              pid: 6,
              ppid: 7,
              name: "Prince Harry",
              img: "https://cdn.balkan.app/shared/f15.png",
            },
            {
              id: 14,
              pid: 12,
              tags: ["left-partner"],
              name: "Amangul Sanat",
              title: "Duchess of Cambridge",
              img: "https://cdn.balkan.app/shared/f13.png",
            },
            {
              id: 15,
              pid: 13,
              tags: ["right-partner"],
              name: "Meghan Markle",
              img: "https://cdn.balkan.app/shared/f16.png",
            },
            {
              id: 16,
              pid: 12,
              ppid: 14,
              tags: ["blue"],
              name: "Akmaral Rakhad",
              img: "https://cdn.balkan.app/shared/f17.png",
            },
            {
              id: 17,
              pid: 12,
              ppid: 14,
              tags: ["blue"],
              name: "Shyngys Rakhad",
              img: "https://cdn.balkan.app/shared/f18.png",
            },
            {
              id: 18,
              pid: 12,
              ppid: 14,
              tags: ["blue"],
              name: "Miras Rakhad",
              img: "https://cdn.balkan.app/shared/f19.png",
            },
            {
              id: 19,
              pid: 12,
              ppid: 14,
              name: "Olzhas Rakhad",
              img: "https://cdn.balkan.app/shared/f19.png",
            },
            {
              id: 20,
              pid: 13,
              ppid: 15,
              name: "Elman Andro",
              img: "https://cdn.balkan.app/shared/f19.png",
            },
          ]}
        />
      </Spacing>
      <Title size={"16px"}>Contact List</Title>
      <Spacing m={{ t: "20px" }}>
        <ContactsTable contacts={childContactsTableData(contacts)} />
      </Spacing>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
`;
