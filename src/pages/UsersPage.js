import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { AddUserButton, UsersSearchBar, UsersTable } from "../components/Users";
import { Box, Spacing, Title } from "../components/ui/atoms";
import { Sidebar } from "../components/ui/common";
import { SidebarTemplate } from "../components/ui/templates";
import { fetchUsers } from "../context/user/userProvider";
import { UserBreadcrumbs } from "../components/Users/UserBreadcrumbs";
import Button from "@atlaskit/button";
import { userTableData } from "../content/user.data";

const AllUsers = ({ history }) => (
  <>
    <Spacing m={{ t: "23px" }}>
      <Box d="flex" justify="space-between">
        <UsersSearchBar />
        <AddUserButton onClick={() => history.push("/users/add")} />
      </Box>
    </Spacing>
  </>
);

const ConcreteUser = ({ name }) => (
  <>
    <Spacing m={{ t: "23px" }}>
      <Box d="flex" justify="space-between" align-items="flex-start">
        <UserBreadcrumbs text={name} />
        <Button appearance="danger">Reset password</Button>
      </Box>
    </Spacing>
  </>
);

export const UsersPage = (props) => {
  const history = useHistory();
  const id = props.match.params.id;
  const [name, setName] = useState("");
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetchUsers({ id: id, view: "extended" }).then((items) => {
      const full_name = Array.isArray(items)
        ? ""
        : `${items.first_name} ${items.last_name}`;
      setName(full_name);
      setUsers(userTableData(items, history));
    });
  }, [id]);
  return (
    <SidebarTemplate sidebar={<Sidebar />}>
      <Title>Users</Title>
      {id ? <ConcreteUser name={name} /> : <AllUsers history={history} />}
      <Spacing m={{ t: "23px" }}>
        <UsersTable items={users} />
      </Spacing>
    </SidebarTemplate>
  );
};
