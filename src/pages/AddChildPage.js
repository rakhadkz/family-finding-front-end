import Breadcrumbs, { BreadcrumbsItem } from "@atlaskit/breadcrumbs";
import PeopleIcon from "@atlaskit/icon/glyph/people";
import React from "react";
import { useHistory } from "react-router-dom";
import { AddChildForm } from "../components/Children";
import { Spacing, Title } from "../components/ui/atoms";
import { createChild } from "../context/children/childProvider";

export const AddChildPage = () => {
  const history = useHistory();

  return (
    <>
      <Title>Add Child</Title>
      <Spacing m={{ t: "28px" }}>
        <Breadcrumbs>
          <BreadcrumbsItem
            iconBefore={
              <Spacing m={{ r: "7px" }}>
                <PeopleIcon primaryColor="#2684FF" />
              </Spacing>
            }
            text="Children"
            onClick={() => history.goBack()}
          />
          <BreadcrumbsItem text="Add Child" />
        </Breadcrumbs>
      </Spacing>
      <AddChildForm onSubmit={createChild} />
    </>
  );
};
