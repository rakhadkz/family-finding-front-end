import Tabs from "@atlaskit/tabs";
import React from "react";

const tabs = [
  { label: "Family Tree" },
  { label: "Family Search" },
  { label: "Comments" },
  { label: "Attachments" },
  { label: "Potential Matches" },
];

export const ChildTabs = () => <Tabs tabs={tabs} />;
