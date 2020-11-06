import DynamicTable from "@atlaskit/dynamic-table";
import styled from "styled-components";

const TableCell = styled.span`
  font-family: Helvetica;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;

  color: #172b4d;
`;

const columns = [
  {
    key: "name",
    content: "Name",
    width: 25,
  },
  {
    key: "address",
    content: "Address",
    width: 33,
  },
  {
    key: "city",
    content: "City",
    width: 15,
  },
  {
    key: "state",
    content: "State",
    width: 15,
  },
  {
    key: "zip",
    content: "Zip",
    width: 8,
  },
];

const rows = [
  {
    key: `1`,
    cells: [
      {
        key: "name",
        content: <a href="https://atlassian.design">2000 Spays and Neuters</a>,
      },
      {
        key: "address",
        content: (
          <TableCell>111 West Middle River St. Desoto, TX 75115"</TableCell>
        ),
      },
      {
        key: "city",
        content: "New York",
      },
      {
        key: "state",
        content: "New York",
      },
      {
        key: "zip",
        content: "10001",
      },
    ],
  },
];

export const OrganizationsTable = () => {
  return (
    <TableWrapper>
      <DynamicTable
        head={{ cells: columns }}
        rows={rows}
        loadingSpinnerSize="large"
        isLoading={false}
        isFixedSize
      />
    </TableWrapper>
  );
};

const TableWrapper = styled.div`
  width: 100%;
`;
