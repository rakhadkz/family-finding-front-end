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

export const UsersTable = ({ items }) => {
  return (
    <TableWrapper>
      <DynamicTable head={{ cells: columns }} rows={items} isFixedSize />
    </TableWrapper>
  );
};
