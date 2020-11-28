import Tabs from "@atlaskit/tabs";
import React from "react";
import { AttachmentsPage } from "./tabs/Attachments/AttachmentsPage";

const tabs = [
  { label: "Family Tree" },
  { label: "Family Search" },
  { label: "Comments" },
  { label: "Attachments", content: <AttachmentsPage /> },
  { label: "Potential Matches" },
];

export const ChildTabs = () => <Tabs tabs={tabs} />;
