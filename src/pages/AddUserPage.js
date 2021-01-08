import React from "react";
import { Spacing, Title } from "../components/ui/atoms";
import { Sidebar } from "../components/ui/common";
import { SidebarTemplate } from "../components/ui/templates";
import { AddUserForm } from "../components/Users";
import { UserBreadcrumbs } from "../components/Users/UserBreadcrumbs";
import { useAuth } from "../context/auth/authContext";

export const AddUserPage = () => {
  const { sign } = useAuth();
  return (
    <SidebarTemplate sidebar={<Sidebar />}>
      <Title>Users</Title>
      <Spacing m={{ t: "28px" }}>
        <UserBreadcrumbs text="Add User" />
      </Spacing>
      <AddUserForm onSubmit={sign} />
    </SidebarTemplate>
  );
};
