import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { fetchOrganizationsMeta } from "../api/organization";
import { OrganizationBreadcrumbs } from "../components/Organizations";
import { Box, Spacing, Title } from "../components/ui/atoms";
import { Sidebar } from "../components/ui/common";
import OfficeBuilding from "@atlaskit/icon/glyph/office-building";
import { SearchBar } from "../components/ui/molecules/SearchBar";
import { SidebarTemplate } from "../components/ui/templates";
import { organizationTableData } from "../content/organization.data";
import { fetchOrganizations } from "../context/organization/organizationProvider";
import { Table } from "../components/ui/common/Table";
import { organizationsTableColumns } from "../content/columns.data";
import Button from "@atlaskit/button";

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
    fetchOrganizationsMeta().then((response) =>
      setTotalPage(response.num_pages)
    );
    fetchOrganizations({ id: id, page: currentPage || 1 }).then((items) => {
      if (items) {
        setName(items.name);
        setOrganizations(organizationTableData(items, history));
        setTablePending(false);
      }
    });
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
