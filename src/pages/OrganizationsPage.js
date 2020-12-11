import Button from "@atlaskit/button";
import OfficeBuilding from "@atlaskit/icon/glyph/office-building";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { OrganizationBreadcrumbs } from "../components/Organizations";
import { Box, Spacing, Title } from "../components/ui/atoms";
import { Sidebar } from "../components/ui/common";
import { Table } from "../components/ui/common/Table";
import { SearchBar } from "../components/ui/molecules/SearchBar";
import { SidebarTemplate } from "../components/ui/templates";
import { organizationsTableColumns } from "../content/columns.data";
import { organizationTableData } from "../content/organization.data";
import { fetchOrganizations } from "../context/organization/organizationProvider";

const AllOrganizations = ({ history }) => (
  <>
    <Spacing m={{ t: "23px" }}>
      <Box d="flex" justify="space-between">
        <SearchBar />
        <Button
          appearance="primary"
          iconBefore={<OfficeBuilding />}
          onClick={() => history.push("/organizations-add")}
        >
          Add organization
        </Button>
      </Box>
    </Spacing>
  </>
);

const ConcreteOrganization = ({ name }) => (
  <>
    <Spacing m={{ t: "23px" }}>
      <OrganizationBreadcrumbs text={name} />
    </Spacing>
  </>
);

export const OrganizationsPage = (props) => {
  const history = useHistory();
  const id = props.match.params.id;
  const [name, setName] = useState("");
  const [organizations, setOrganizations] = useState([]);
  const [totalPage, setTotalPage] = useState(null);
  const [tablePending, setTablePending] = useState(true);
  const query = new URLSearchParams(props.location.search);
  var currentPage = query.get("page") || 1;
  useEffect(() => {
    fetchOrganizations({ id: id, page: currentPage || 1, meta: true }).then(
      (response) => {
        if (response) {
          const items = response.data;
          setTotalPage(response.meta?.num_pages);
          setName(items?.name);
          setOrganizations(organizationTableData(items, history));
          setTablePending(false);
        }
      }
    );
  }, [id, currentPage]);
  return (
    <SidebarTemplate sidebar={<Sidebar />}>
      <Title>Organizations</Title>
      {id ? (
        <ConcreteOrganization name={name} />
      ) : (
        <AllOrganizations history={history} />
      )}
      <Spacing m={{ t: "23px" }}>
        <Table
          totalPage={!id && totalPage}
          currentPage={currentPage}
          items={organizations}
          pending={tablePending}
          head={organizationsTableColumns}
        />
      </Spacing>
    </SidebarTemplate>
  );
};
