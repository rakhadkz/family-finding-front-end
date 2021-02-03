import Tabs from "@atlaskit/tabs";
import React, { useEffect, useState, useContext } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { fetchChildrenRequest } from "../../api/children";
import { constructTree } from "../../content/childContact.tree.data";
import { AttachmentsPage } from "./tabs/Attachments/AttachmentsPage";
import { CommentsTab } from "./tabs/Comments/CommentsTab";
import { Connections } from "./tabs/Connections/Connections";
import { FamilyTreePage } from "./tabs/Tree/FamilyTreePage";
import { ChildContext } from "../../pages/ChildProfilePage";

export const ChildTabs = ({
  id,
  fetchChildProfile,
  first_name: firstName,
  last_name: lastName,
  family_tree = [],
}) => {
  const tabs = [
    {
      label: "Connections",
      content: (
        <Connections
          treeContacts={constructTree({
            contacts: family_tree,
            firstName,
            lastName,
          })}
          refreshContacts={fetchChildProfile}
        />
      ),
    },
    {
      label: "Family Tree",
      content: (
        <FamilyTreePage
          contacts={constructTree({
            contacts: family_tree,
            firstName,
            lastName,
          })}
          refreshContacts={fetchChildProfile}
        />
      ),
    },
    { label: "Family Search" },
    {
      label: "Comments",
      content: <CommentsTab refresh={fetchChildProfile} />,
    },
    {
      label: "Attachments",
      content: <AttachmentsPage child_id={id} />,
    },
  ];
  const location = useLocation();
  const [current, setCurrent] = useState(0);
  let history = useHistory();

  useEffect(() => {
    if (location.hash.length > 0) {
      let label = location.hash.substr(1);
      let index = tabs
        .map((tab) => tab.label.replace(/\s+/g, "-").toLowerCase())
        .indexOf(label);
      if (index > -1) setCurrent(index);
    }
  }, [location.hash.length]);

  const selectTab = (tab, index) => {
    setCurrent(index);
    history.push(`#${tab.label.replace(/\s+/g, "-").toLowerCase()}`);
  };

  return firstName && lastName ? (
    <Tabs onSelect={selectTab} selected={tabs[current]} tabs={tabs} />
  ) : null;
};
