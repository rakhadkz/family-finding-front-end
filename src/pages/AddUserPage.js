import Breadcrumbs, { BreadcrumbsItem } from "@atlaskit/breadcrumbs";
import React from "react";
import PeopleIcon from "@atlaskit/icon/glyph/people";
import { Spacing, Title } from "../components/ui/atoms";
import { Sidebar } from "../components/ui/common";
import { SidebarTemplate } from "../components/ui/templates";
import { AddUserForm } from "../components/Users";
import { useAuth } from "../context/auth/authContext";
import { useHistory } from "react-router-dom";

export const AddUserPage = () => {
  const { sign } = useAuth();
  const history = useHistory();
  const backToUsers = (e) => {
    e.preventDefault();
    history.push("./");
  };
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
            onClick={backToUsers}
          />
          <BreadcrumbsItem text="Add user" />
        </Breadcrumbs>
      </Spacing>
      <AddUserForm onSubmit={sign} />
    </SidebarTemplate>
  );
};
