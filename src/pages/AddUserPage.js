import Breadcrumbs, { BreadcrumbsItem } from "@atlaskit/breadcrumbs";
import React from "react";
import { Spacing, Title } from "../components/ui/atoms";
import { Sidebar } from "../components/ui/common";
import { SidebarTemplate } from "../components/ui/templates";

export const AddUserPage = () => {
  return (
    <SidebarTemplate sidebar={<Sidebar />}>
      <Title>Users</Title>
      <Spacing m={{ t: "28px" }}>
        <Breadcrumbs>
          <BreadcrumbsItem href="/users" text="Users" />
          <BreadcrumbsItem text="Add user" />
        </Breadcrumbs>
      </Spacing>
    </SidebarTemplate>
  );
};
