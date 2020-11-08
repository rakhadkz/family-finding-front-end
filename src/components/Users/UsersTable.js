import DynamicTable from "@atlaskit/dynamic-table";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { fetchUsers } from "../../context/user/userProvider";

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

export const UsersTable = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetchUsers().then((items) => {
      var rows = items.map(function (item, index) {
        var organization_name = "";
        item.organization
          ? (organization_name = item.organization.name)
          : (organization_name = "null");
        return {
          key: index,
          cells: [
            {
              key: "name",
              content: item.first_name + " " + item.last_name,
            },
            {
              key: "email",
              content: item.email,
            },
            {
              key: "phone",
              content: item.phone,
            },
            {
              key: "organization",
              content: organization_name,
            },
            {
              key: "role",
              content: item.role,
            },
          ],
        };
      });
      setUsers(rows);
    });
  }, []);

  return (
    <TableWrapper>
      <DynamicTable
        head={{ cells: columns }}
        rows={users}
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
