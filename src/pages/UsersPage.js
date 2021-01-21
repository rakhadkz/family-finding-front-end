import Button from "@atlaskit/button";
import PersonIcon from "@atlaskit/icon/glyph/person";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Box, Spacing, Title } from "../components/ui/atoms";
import { ModalDialog } from "../components/ui/common";
import { Table } from "../components/ui/common/Table";
import { SearchBar } from "../components/ui/molecules/SearchBar";
import { UserBreadcrumbs } from "../components/Users/UserBreadcrumbs";
import { usersTableColumns } from "../content/columns.data";
import { userTableData } from "../content/user.data";
import { getLocalStorageUser, reset } from "../context/auth/authProvider";
import { deleteUser, fetchUsers } from "../context/user/userProvider";
import { USERS } from "../helpers/routes";

const AllUsers = ({ history, search, setSearch }) => (
  <>
    <Spacing m={{ t: "23px" }}>
      <Box d="flex" justify="space-between">
        <Box d="flex" align="flex-end">
          <SearchBar
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Box>
        <Button
          appearance="primary"
          iconBefore={<PersonIcon />}
          onClick={() => history.push("/users-add")}
        >
          Add User
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
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [users, setUsers] = useState([]);
  const user = getLocalStorageUser();
  const [refresh, setRefresh] = useState(false);
  const [id, setId] = useState(props.match.params.id);
  const [currentUser, setCurrentUser] = useState(-1);
  const [tablePending, setTablePending] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [totalPage, setTotalPage] = useState(null);
  const [currentPage, setCurrentPage] = useState(query.get("page") || 1);
  const [search, setSearch] = useState(query.get("search") || "");
  const head = usersTableColumns(user?.role === "super_admin");

  const organization =
    user && user?.user_organizations
      ? user?.user_organizations[0]?.organization
      : { users: [], name: "" };

  const onDelete = (id) => {
    setRefresh(true);
    deleteUser(id).finally(() => {
      setRefresh(false);
      setIsOpen(false);
      user?.role === "super_admin"
        ? history.push("../users")
        : history.push("../organization_users");
    });
  };

  useEffect(() => {
    setTablePending(true);
    const timer = setTimeout(
      () =>
        fetchUsers({
          id: id,
          view: "table",
          search: search,
          page: currentPage,
          meta: true,
        })
          .then((response) => {
            if (response) {
              if (id) {
                const data = response.data;
                setUsers(userTableData(data, user, setIsOpen, setCurrentUser));
                setName(`${data.first_name} ${data.last_name}`);
                setEmail(data.email);
              } else {
                const items = response.data;
                setTotalPage(response.meta.num_pages);
                setUsers(
                  userTableData(items, user, setIsOpen, setCurrentUser, history)
                );
              }
            }
          })
          .finally(() => setTablePending(false)),
      search.length === 0 ? 0 : 1000
    );
    return () => clearTimeout(timer);
  }, [id, refresh, currentPage, search]);

  return (
    <>
      <Title>{user?.role !== "super_admin" && organization?.name} Users</Title>
      {id ? (
        <ConcreteUser name={name} email={email} />
      ) : (
        <AllUsers history={history} search={search} setSearch={setSearch} />
      )}
      <Spacing m={{ t: "23px" }}>
        <Table
          totalPage={!id && totalPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          items={users}
          pending={tablePending}
          head={head}
        />
      </Spacing>
      <ModalDialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onClick={() => onDelete(currentUser)}
        positiveLabel="Delete"
        heading="Are you sure you want to remove this user?"
        body="This user will no longer have access to your organization"
        appearance="danger"
      />
    </>
  );
};
