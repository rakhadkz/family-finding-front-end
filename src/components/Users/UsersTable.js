import DynamicTable from "@atlaskit/dynamic-table";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { userTableData } from "../../content/user.data";
import { TableWrapper } from "../ui/common";

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
    fetch({ id: id, view: "extended" }).then(
      (items) =>
        items && setUsers(userTableData(items, isConcreteUser, history))
    );
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
