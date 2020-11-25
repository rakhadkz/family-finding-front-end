import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { AddUserButton, UsersSearchBar, UsersTable } from "../components/Users";
import { Box, Spacing, Title } from "../components/ui/atoms";
import { Sidebar } from "../components/ui/common";
import { SidebarTemplate } from "../components/ui/templates";
import { fetchConcreteUser, fetchUsers } from "../context/user/userProvider";
import { UserBreadcrumbs } from "../components/Users/UserBreadcrumbs";

const AllUsers = ({ history }) => {
  return (
    <>
      <Spacing m={{ t: "23px" }}>
        <Box d="flex" justify="space-between">
          <UsersSearchBar />
          <AddUserButton onClick={() => history.push("/users/add")} />
        </Box>
      </Spacing>
      <Spacing m={{ t: "20px" }}>
        <UsersTable fetch={fetchUsers} />
      </Spacing>
    </>
  );
};

const ConcreteUser = ({ id }) => {
  return (
    <>
      <Spacing m={{ t: "23px" }}>
        <Box d="flex" justify="space-between">
          <UserBreadcrumbs text={id} />
          <AddUserButton />
        </Box>
      </Spacing>
      <Spacing m={{ t: "20px" }}>
        <UsersTable fetch={fetchConcreteUser} id={id} isConcreteUser={true} />
      </Spacing>
    </>
  );
};

export const UsersPage = (props) => {
  const history = useHistory();
  const id = props.match.params.id;
  return (
    <SidebarTemplate sidebar={<Sidebar />}>
      <Title>Users</Title>
      {id ? <ConcreteUser id={id} /> : <AllUsers history={history} />}

      {/* <Spacing m={{ t: "23px" }}>
        <Box d="flex" justify="space-between">
          <UsersSearchBar />
          <AddUserButton onClick={() => history.push("/users/add")} />
        </Box>
      </Spacing>
      <Spacing m={{ t: "20px" }}>
        <UsersTable fetch={fetchUsers} />
      </Spacing> */}
    </SidebarTemplate>
  );
};
