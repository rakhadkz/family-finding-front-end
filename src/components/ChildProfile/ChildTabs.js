import Tabs from "@atlaskit/tabs";
import React from "react";
import CommentsTab from './CommentsTab'

const tabs = [
  { label: "Family Tree" },
  { label: "Family Search" },
  { label: "Comments", content: <CommentsTab /> },
  { label: "Attachments" },
  { label: "Potential Matches" },
];

export const ChildTabs = () => <Tabs tabs={tabs} />;
