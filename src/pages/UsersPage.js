import React from "react";
import { useHistory } from "react-router-dom";
import { AddUserButton, UsersSearchBar, UsersTable } from "../components/Users";
import { Box, Spacing, Title } from "../components/ui/atoms";
import { Sidebar } from "../components/ui/common";
import { SidebarTemplate } from "../components/ui/templates";
import { fetchUsers } from "../context/user/userProvider";
import { UserBreadcrumbs } from "../components/Users/UserBreadcrumbs";
import Button from "@atlaskit/button";

const AllUsers = ({ history }) => (
  <>
    <Spacing m={{ t: "23px" }}>
      <Box d="flex" justify="space-between">
        <UsersSearchBar />
        <AddUserButton onClick={() => history.push("/users/add")} />
      </Box>
    </Spacing>
    <Spacing m={{ t: "23px" }}>
      <UsersTable fetch={fetchUsers} />
    </Spacing>
  </>
);

const ConcreteUser = ({ id }) => (
  <>
    <Spacing m={{ t: "23px" }}>
      <Box d="flex" justify="space-between" align-items="flex-start">
        <UserBreadcrumbs text={id} />
        <Button appearance="danger">Reset password</Button>
      </Box>
    </Spacing>
    <Spacing m={{ t: "23px" }}>
      <UsersTable fetch={fetchUsers} id={id} isConcreteUser={true} />
    </Spacing>
  </>
);

export const UsersPage = (props) => {
  const history = useHistory();
  const id = props.match.params.id;
  return (
    <SidebarTemplate sidebar={<Sidebar />}>
      <Title>Users</Title>
      {id ? <ConcreteUser id={id} /> : <AllUsers history={history} />}
    </SidebarTemplate>
  );
};
