import Button from "@atlaskit/button";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Box, Spacing, Title } from "../components/ui/atoms";
import { Sidebar } from "../components/ui/common";
import { SidebarTemplate } from "../components/ui/templates";
import { AddUserButton, UsersSearchBar, UsersTable } from "../components/Users";
import { UserBreadcrumbs } from "../components/Users/UserBreadcrumbs";
import { userTableData } from "../content/user.data";
import { useAuth } from "../context/auth/authContext";
import { deleteUser, fetchUsers } from "../context/user/userProvider";

const AllUsers = ({ history }) => (
  <>
    <Spacing m={{ t: "23px" }}>
      <Box d="flex" justify="space-between">
        <UsersSearchBar />
        <AddUserButton onClick={() => history.push("/users-add")} />
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
  const { id } = props.match.params;
  const { isOrganization } = props;
  const [name, setName] = useState("");
  const [users, setUsers] = useState([]);
  const { user } = useAuth();
  const [refresh, setRefresh] = useState(true);
  const organization =
    user &&
    (isOrganization && user?.user_organizations
      ? user?.user_organizations[0]?.organization
      : { users: [], name: "" });

  const onDelete = (userId) => {
    deleteUser(userId).then(() => setRefresh((prev) => !prev));
  };

  useEffect(() => {
    id !== "add" &&
      (isOrganization
        ? organization &&
          setUsers(
            userTableData(
              organization?.users,
              history,
              onDelete,
              organization?.name
            )
          )
        : fetchUsers({ id: id, view: "extended" }).then((items) => {
            if (items) {
              const full_name = Array.isArray(items)
                ? ""
                : `${items.first_name} ${items.last_name}`;
              setName(full_name);
              setUsers(userTableData(items, history, onDelete));
            }
          }));
  }, [id, refresh]);

  return (
    <SidebarTemplate sidebar={<Sidebar />}>
      <Title>{isOrganization && "Organization "}Users</Title>
      {id ? <ConcreteUser name={name} /> : <AllUsers history={history} />}
      <Spacing m={{ t: "23px" }}>
        <UsersTable items={users} isOrganization={isOrganization} />
      </Spacing>
    </SidebarTemplate>
  );
};
