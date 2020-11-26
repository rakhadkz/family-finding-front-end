import Breadcrumbs, { BreadcrumbsItem } from "@atlaskit/breadcrumbs";
import PeopleIcon from "@atlaskit/icon/glyph/people";
import React from "react";
import { useHistory } from "react-router-dom";
import { Spacing, Title } from "../components/ui/atoms";
import { Sidebar } from "../components/ui/common";
import { SidebarTemplate } from "../components/ui/templates";
import { AddUserForm } from "../components/Users";
import { useAuth } from "../context/auth/authContext";

export const AddUserPage = () => {
  const { sign } = useAuth();
  const history = useHistory();

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
            text="Users"
            onClick={() => history.goBack()}
          />
          <BreadcrumbsItem text="Add user" />
        </Breadcrumbs>
      </Spacing>
      <AddUserForm onSubmit={sign} />
    </SidebarTemplate>
  );
};
