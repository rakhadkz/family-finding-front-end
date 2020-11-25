import DynamicTable from "@atlaskit/dynamic-table";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { userTableData } from "../../content/user.data";
import { fetchUsers } from "../../context/user/userProvider";

const TableCell = styled.span`
  font-family: Helvetica;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  margin-top: 40px;
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

export const UsersTable = ({ fetch, isConcreteUser = false, id = 0 }) => {
  const [users, setUsers] = useState([]);
  const history = useHistory();
  useEffect(() => {
    if (isConcreteUser) {
      fetch(id).then((item) => {
        if (item) setUsers(userTableData([item], isConcreteUser, history));
      });
    } else {
      fetch().then((items) => {
        if (items) setUsers(userTableData(items, isConcreteUser, history));
      });
    }
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
