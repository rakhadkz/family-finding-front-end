import React from "react";
import Breadcrumbs, { BreadcrumbsItem } from "@atlaskit/breadcrumbs";
import OfficeBuilding from "@atlaskit/icon/glyph/office-building";
import { Spacing } from "../../components/ui/atoms";
import { useHistory } from "react-router-dom";

export const OrganizationBreadcrumbs = ({ text }) => {
  const history = useHistory();
  const back = (e) => {
    e.preventDefault();
    history.push("./");
  };

  return (
    <>
      <Breadcrumbs>
        <BreadcrumbsItem
          iconBefore={
            <Spacing m={{ r: "7px" }}>
              <OfficeBuilding primaryColor="#2684FF" />
            </Spacing>
          }
          text="Organizations"
          onClick={back}
        />
        <BreadcrumbsItem text={text} />
      </Breadcrumbs>
    </>
  );
};
