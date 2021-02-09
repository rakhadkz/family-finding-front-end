import Tabs from "@atlaskit/tabs";
import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { AttachmentsPage } from "./tabs/Attachments/AttachmentsPage";
import { CommentsTab } from "./tabs/Comments/CommentsTab";
import { Connections } from "./tabs/Connections";
import { FamilyTreePage } from "./tabs/Tree/FamilyTreePage";

export const ChildTabs = ({
  id,
  fetchChildProfile,
  first_name: firstName,
  last_name: lastName,
}) => {
  const tabs = [
    {
      label: "Connections",
      content: <Connections />,
    },
    {
      label: "Family Tree",
      content: <FamilyTreePage />,
    },
    { label: "Family Search" },
    {
      label: "Comments",
      content: <CommentsTab refresh={fetchChildProfile} />,
    },
    {
      label: "Attachments",
      content: <AttachmentsPage />,
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
