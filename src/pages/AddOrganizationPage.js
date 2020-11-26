import Breadcrumbs, { BreadcrumbsItem } from "@atlaskit/breadcrumbs";
import OfficeBuilding from "@atlaskit/icon/glyph/office-building";
import React from "react";
import { useHistory } from "react-router-dom";
import { AddOrganizationForm } from "../components/Organizations";
import { Spacing, Title } from "../components/ui/atoms";
import { Sidebar } from "../components/ui/common";
import { SidebarTemplate } from "../components/ui/templates";
import { useOrganization } from "../context/organization/organizationContext";

export const AddOrganizationPage = () => {
  const { createOrgnaization } = useOrganization();
  const history = useHistory();

  return (
    <SidebarTemplate sidebar={<Sidebar />}>
      <Title>Organizations</Title>
      <Spacing m={{ t: "28px" }}>
        <Breadcrumbs>
          <BreadcrumbsItem
            iconBefore={
              <Spacing m={{ r: "7px" }}>
                <OfficeBuilding primaryColor="#2684FF" />
              </Spacing>
            }
            onClick={() => history.goBack()}
            text="Organizations"
          />
          <BreadcrumbsItem text="Add organization" />
        </Breadcrumbs>
      </Spacing>
      <AddOrganizationForm onSubmit={createOrgnaization} />
    </SidebarTemplate>
  );
};
