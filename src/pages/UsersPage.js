import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Box, Spacing, Title } from "../components/ui/atoms";
import { ModalDialog, Sidebar } from "../components/ui/common";
import { SidebarTemplate } from "../components/ui/templates";
import PersonIcon from "@atlaskit/icon/glyph/person";
import { UserBreadcrumbs } from "../components/Users/UserBreadcrumbs";
import { userTableData } from "../content/user.data";
import { useAuth } from "../context/auth/authContext";
import { reset } from "../context/auth/authProvider";
import { deleteUser, fetchUsers } from "../context/user/userProvider";
import { USERS } from "../helpers/routes";
import { fetchUsersMeta } from "../api/user";
import { SearchBar } from "../components/ui/molecules/SearchBar";
import { Table } from "../components/ui/common/Table";
import { usersTableColumns } from "../content/columns.data";
import Button from "@atlaskit/button";
const AllUsers = ({ history }) => (
  <>
    <Spacing m={{ t: "23px" }}>
      <Box d="flex" justify="space-between">
        <SearchBar />
        <Button
          appearance="primary"
          iconBefore={<PersonIcon />}
          onClick={() => history.push("/users-add")}
        >
          Add user
        </Button>
      </Box>
    </Spacing>
  </>
);

const ConcreteUser = ({ name, email }) => {
  const history = useHistory();
  const [pending, setPending] = useState(false);

  return (
    <>
      <Spacing m={{ t: "23px" }}>
        <Box d="flex" justify="space-between" align-items="flex-start">
          <UserBreadcrumbs text={name} />
          <Button
            isDisabled={pending}
            appearance="danger"
            onClick={() => {
              setPending(true);
              reset({ email })
                .then(() => history.push(`/${USERS}`))
                .finally(() => setPending(false));
            }}
          >
            Reset password
          </Button>
        </Box>
      </Spacing>
    </>
  );
};
export const UsersPage = (props) => {
  const history = useHistory();
  const query = new URLSearchParams(props.location.search);
  const { id } = props.match.params;
  var currentPage = query.get("page") || 1;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [users, setUsers] = useState([]);
  const { user } = useAuth();
  const [refresh, setRefresh] = useState(false);
  const [currentUser, setCurrentUser] = useState(-1);
  const [tablePending, setTablePending] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [totalPage, setTotalPage] = useState(null);
  const organization =
    user && user?.user_organizations
      ? user?.user_organizations[0]?.organization
      : { users: [], name: "" };

  const onDelete = (userId) => {
    setRefresh(true);
    deleteUser(userId).finally(() => {
      setRefresh(false);
      setIsOpen(false);
      id && history.push("../users");
    });
  };

  useEffect(() => {
    fetchUsersMeta().then((response) => setTotalPage(response.num_pages));
    fetchUsers({ id: id, view: "extended", page: currentPage || 1 }).then(
      (items) => {
        if (items) {
          !Array.isArray(items) &&
            setName(`${items.first_name} ${items.last_name}`) &&
            setEmail(items.email);
          setUsers(
            userTableData(items, history, user, setIsOpen, setCurrentUser)
          );
          setTablePending(false);
        }
      }
    );
  }, [id, refresh, currentPage]);

  return (
    <SidebarTemplate sidebar={<Sidebar />}>
      <Title>
        {user?.role === "super_admin" ? "Users" : organization?.name + " Users"}
      </Title>
      {id ? (
        <ConcreteUser name={name} email={email} />
      ) : (
        <AllUsers history={history} />
      )}
      <Spacing m={{ t: "23px" }}>
        <Table
          totalPage={!id && totalPage}
          currentPage={currentPage}
          items={users}
          pending={tablePending}
          head={usersTableColumns}
        />
      </Spacing>
      <ModalDialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onClick={() => onDelete(currentUser)}
        positiveLabel="Delete"
        heading="Delete"
        body="It will permanently delete all related artifacts (comments, attachments and etc). This can't be undone"
        appearance="danger"
      />
    </SidebarTemplate>
  );
};
