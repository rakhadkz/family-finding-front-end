import Tabs from "@atlaskit/tabs";
import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { PotentialMatches } from "../Children/PotentialMatches";
import { CommentsTab } from "./CommentsTab";
import { AttachmentsPage } from "./tabs/Attachments/AttachmentsPage";
import { FamilyTreePage } from "./tabs/Tree/FamilyTreePage";

export const ChildTabs = (
  {
    id,
    first_name: firstName,
    last_name: lastName,
    comments = [],
    contacts = [],
    attachments = [],
    refreshContacts
  },
  setChild,
) => {
  console.log(firstName, lastName, contacts);
  const tabs = [
    {
      label: "Family Tree",
      content: contacts.length && (
        <FamilyTreePage
          firstName={firstName}
          lastName={lastName}
          contacts={contacts}
          refreshContacts={refreshContacts}
        />
      ),
    },
    { label: "Family Search" },
    {
      label: "Comments",
      content: <CommentsTab childId={id} childComments={comments} setChild={setChild} />,
    },
    {
      label: "Attachments",
      content: <AttachmentsPage attachments={attachments} />,
    },
    {
      label: "Potential Matches",
      content: <PotentialMatches />,
    },
  ];
  const location = useLocation();
  const [current, setCurrent] = useState(0);
  let history = useHistory();
  // use history.push('/some/path') here

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

  return <Tabs onSelect={selectTab} selected={tabs[current]} tabs={tabs} />;
};
