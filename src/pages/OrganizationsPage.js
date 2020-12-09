import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { fetchOrganizationsMeta } from "../api/organization";
import {
  AddOrganizationButton,
  OrganizationsSearchBar,
  OrganizationsTable,
  OrganizationBreadcrumbs,
} from "../components/Organizations";
import { Box, Spacing, Title } from "../components/ui/atoms";
import { Pagination, Sidebar } from "../components/ui/common";
import { SidebarTemplate } from "../components/ui/templates";
import { organizationTableData } from "../content/organization.data";
import { fetchOrganizations } from "../context/organization/organizationProvider";

const AllOrganizations = ({ history }) => (
  <>
    <Spacing m={{ t: "23px" }}>
      <Box d="flex" justify="space-between">
        <OrganizationsSearchBar />
        <AddOrganizationButton
          onClick={() => history.push("/organizations-add")}
        />
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
  const query = new URLSearchParams(props.location.search);
  var currentPage = query.get("page") || 1;
  useEffect(() => {
    fetchOrganizations({ id: id, page: currentPage || 1 }).then((items) => {
      if (items) {
        setName(items.name);
        setOrganizations(organizationTableData(items, history));
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
        {!id && (
          <Pagination
            fetch={fetchOrganizationsMeta}
            currentPage={currentPage}
          />
        )}
        <OrganizationsTable items={organizations} />
      </Spacing>
    </SidebarTemplate>
  );
};
