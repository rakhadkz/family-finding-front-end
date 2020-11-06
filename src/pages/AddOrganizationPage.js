import Breadcrumbs, { BreadcrumbsItem } from "@atlaskit/breadcrumbs";
import React from "react";
import { Spacing, Title } from "../components/ui/atoms";
import { Sidebar } from "../components/ui/common";
import { SidebarTemplate } from "../components/ui/templates";

export const AddOrganizationPage = () => {
  return (
    <SidebarTemplate sidebar={<Sidebar />}>
      <Title>Organizations</Title>
      <Spacing m={{ t: "28px" }}>
        <Breadcrumbs>
          <BreadcrumbsItem href="/organizations" text="Organizations" />
          <BreadcrumbsItem text="Add organization" />
        </Breadcrumbs>
      </Spacing>
    </SidebarTemplate>
  );
};
