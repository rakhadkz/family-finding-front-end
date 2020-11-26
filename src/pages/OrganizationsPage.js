import Button from "@atlaskit/button";
import React from "react";
import { useHistory } from "react-router-dom";
import {
  AddOrganizationButton,
  OrganizationsSearchBar,
  OrganizationsTable,
  OrganizationBreadcrumbs,
} from "../components/Organizations";
import { Box, Spacing, Title } from "../components/ui/atoms";
import { Sidebar } from "../components/ui/common";
import { SidebarTemplate } from "../components/ui/templates";
import { fetchOrganizations } from "../context/organization/organizationProvider";

const AllOrganizations = ({ history }) => (
  <>
    <Spacing m={{ t: "23px" }}>
      <Box d="flex" justify="space-between">
        <OrganizationsSearchBar />
        <AddOrganizationButton
          onClick={() => history.push("/organizations/add")}
        />
      </Box>
    </Spacing>
    <Spacing m={{ t: "23px" }}>
      <OrganizationsTable fetch={fetchOrganizations} />
    </Spacing>
  </>
);

const ConcreteOrganization = ({ id }) => (
  <>
    <Spacing m={{ t: "23px" }}>
      <OrganizationBreadcrumbs text={id} />
    </Spacing>
    <Spacing m={{ t: "23px" }}>
      <OrganizationsTable
        fetch={fetchOrganizations}
        id={id}
        isConcreteOrganization={true}
      />
    </Spacing>
  </>
);

export const OrganizationsPage = (props) => {
  const history = useHistory();
  const id = props.match.params.id;
  return (
    <SidebarTemplate sidebar={<Sidebar />}>
      <Title>Organizations</Title>
      {id ? (
        <ConcreteOrganization id={id} />
      ) : (
        <AllOrganizations history={history} />
      )}
    </SidebarTemplate>
  );
};
