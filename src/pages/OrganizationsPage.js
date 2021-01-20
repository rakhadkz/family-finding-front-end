import Button from "@atlaskit/button";
import OfficeBuilding from "@atlaskit/icon/glyph/office-building";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { OrganizationBreadcrumbs } from "../components/Organizations";
import { Box, Spacing, Title } from "../components/ui/atoms";
import { Table } from "../components/ui/common/Table";
import { SearchBar } from "../components/ui/molecules/SearchBar";
import { organizationsTableColumns } from "../content/columns.data";
import { organizationTableData } from "../content/organization.data";
import { fetchOrganizations } from "../context/organization/organizationProvider";

export const updateQueryParams = (currentPage, search) => {
  return `?page=${currentPage}${search ? `&search=${search}` : ``}`;
};

const AllOrganizations = ({ history, search, setSearch }) => {
  return (
    <>
      <Spacing m={{ t: "23px" }}>
        <Box d="flex" justify="space-between">
          <SearchBar
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button
            appearance="primary"
            iconBefore={<OfficeBuilding />}
            onClick={() => history.push("/organizations-add")}
          >
            Add Organization
          </Button>
        </Box>
      </Spacing>
    </>
  );
};

const ConcreteOrganization = ({ name }) => (
  <>
    <Spacing m={{ t: "23px" }}>
      <OrganizationBreadcrumbs text={name} />
    </Spacing>
  </>
);

export const OrganizationsPage = (props) => {
  const history = useHistory();
  const [id, setId] = useState(props.match.params.id);
  const [name, setName] = useState("");
  const [organizations, setOrganizations] = useState([]);
  const [totalPage, setTotalPage] = useState(null);
  const [tablePending, setTablePending] = useState(true);
  const query = new URLSearchParams(props.location.search);
  const [currentPage, setCurrentPage] = useState(query.get("page") || 1);
  const [search, setSearch] = useState(query.get("search") || "");
  useEffect(() => {
    !id && history.push(updateQueryParams(currentPage, search));
    setTablePending(true);
    const timer = setTimeout(
      () =>
        fetchOrganizations({
          id: id,
          page: currentPage,
          meta: true,
          search: search,
        })
          .then((response) => {
            if (response) {
              const items = response.data;
              !id && setTotalPage(response.meta.num_pages);
              setName(items.name);
              setOrganizations(organizationTableData(items, history));
            }
          })
          .finally(() => setTablePending(false)),
      search.length === 0 ? 0 : 1000
    );
    return () => clearTimeout(timer);
  }, [id, currentPage, search]);

  useEffect(() => {
    search.length > 0 && setCurrentPage(1);
  }, [search]);

  return (
    <>
      <Title>Organizations</Title>
      {id ? (
        <ConcreteOrganization name={name} />
      ) : (
        <AllOrganizations
          history={history}
          setSearch={setSearch}
          search={search}
        />
      )}
      <Spacing m={{ t: "23px" }}>
        <Table
          totalPage={!id && totalPage}
          currentPage={currentPage}
          items={organizations}
          pending={tablePending}
          head={organizationsTableColumns}
          setCurrentPage={setCurrentPage}
        />
      </Spacing>
    </>
  );
};
