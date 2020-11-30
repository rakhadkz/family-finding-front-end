import Tabs from "@atlaskit/tabs";
import React from "react";
import { PotentialMatches } from "../Children/PotentialMatches";
import { AttachmentsPage } from "./tabs/Attachments/AttachmentsPage";
import { FamilyTreePage } from "./tabs/Tree/FamilyTreePage";

export const ChildTabs = ({ contacts, attachments }) => {
  const tabs = [
    { label: "Family Tree", content: <FamilyTreePage contacts={contacts} /> },
    { label: "Family Search" },
    { label: "Comments" },
    {
      label: "Attachments",
      content: <AttachmentsPage attachments={attachments} />,
    },
    { label: "Potential Matches",content: <PotentialMatches /> },
  ];
  return <Tabs tabs={tabs} />;
};
