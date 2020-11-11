import Breadcrumbs, { BreadcrumbsItem } from "@atlaskit/breadcrumbs";
import React from "react";
import PeopleIcon from "@atlaskit/icon/glyph/people";
import { Spacing, Title } from "../components/ui/atoms";
import { Sidebar } from "../components/ui/common";
import { SidebarTemplate } from "../components/ui/templates";
import { AddUserForm } from "../components/Users";
import { useAuth } from "../context/auth/authContext";

export const AddUserPage = () => {
  const { sign } = useAuth();
  return (
    <SidebarTemplate sidebar={<Sidebar />}>
      <Title>Users</Title>
      <Spacing m={{ t: "28px" }}>
        <Breadcrumbs>
          <BreadcrumbsItem
            iconBefore={
              <Spacing m={{ r: "7px" }}>
                <PeopleIcon primaryColor="#2684FF" />
              </Spacing>
            }
            href="/users"
            text="Users"
          />
          <BreadcrumbsItem text="Add user" />
        </Breadcrumbs>
      </Spacing>
      <AddUserForm onSubmit={sign} />
    </SidebarTemplate>
  );
};
