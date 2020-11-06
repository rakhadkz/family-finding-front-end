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
    key: "email",
    content: "Email",
    width: 25,
  },
  {
    key: "phone",
    content: "Phone",
    width: 15,
  },
  {
    key: "organization",
    content: "Organization",
    width: 16,
  },
  {
    key: "role",
    content: "Role",
    width: 15,
  },
];

const rows = [
  {
    key: "1",
    cells: [
      {
        key: "name",
        content: <a href="google.com">Shyngys Rakhad</a>,
      },
      {
        key: "email",
        content: "rakhad@gmail.com",
      },
      {
        key: "phone",
        content: "+7 (776) 208 6923",
      },
      {
        key: "organization",
        content: "Desert Electronics",
      },
      {
        key: "role",
        content: "Organization Manager",
      },
    ],
  },
  {
    key: "2",
    cells: [
      {
        key: "name",
        content: <a href="google.com">Jobs Steve</a>,
      },
      {
        key: "email",
        content: "steve@gmail.com",
      },
      {
        key: "phone",
        content: "+8 (888) 777 6666",
      },
      {
        key: "organization",
        content: "Apple Corporation",
      },
      {
        key: "role",
        content: "Organization Admin",
      },
    ],
  },
];

export const UsersTable = () => {
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
