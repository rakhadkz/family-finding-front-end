import Tabs from "@atlaskit/tabs";
import React from "react";
import { AttachmentsPage } from "./tabs/Attachments/AttachmentsPage";
import { FamilyTreePage } from "./tabs/Tree/FamilyTreePage";

const tabs = [
  { label: "Family Tree", content: <FamilyTreePage /> },
  { label: "Family Search" },
  { label: "Comments" },
  { label: "Attachments", content: <AttachmentsPage /> },
  { label: "Potential Matches" },
];

export const ChildTabs = () => <Tabs tabs={tabs} />;
