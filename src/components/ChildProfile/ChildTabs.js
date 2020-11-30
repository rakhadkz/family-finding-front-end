import Tabs from "@atlaskit/tabs";
import React from "react";
import { PotentialMatches } from "../Children/PotentialMatches";

const tabs = [
  { label: "Family Tree" },
  { label: "Family Search" },
  { label: "Comments" },
  { label: "Attachments" },
  { label: "Potential Matches", content: <PotentialMatches /> },
];

export const ChildTabs = () => <Tabs tabs={tabs} />;
