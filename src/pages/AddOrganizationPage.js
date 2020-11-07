import Breadcrumbs, { BreadcrumbsItem } from "@atlaskit/breadcrumbs";
import OfficeBuilding from "@atlaskit/icon/glyph/office-building";
import React from "react";
import { AddOrganizationForm } from "../components/Organizations";
import { Spacing, Title } from "../components/ui/atoms";
import { Sidebar } from "../components/ui/common";
import { SidebarTemplate } from "../components/ui/templates";

export const AddOrganizationPage = () => {
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
            href="/organizations"
            text="Organizations"
          />
          <BreadcrumbsItem text="Add organization" />
        </Breadcrumbs>
      </Spacing>
      <AddOrganizationForm />
    </SidebarTemplate>
  );
};
