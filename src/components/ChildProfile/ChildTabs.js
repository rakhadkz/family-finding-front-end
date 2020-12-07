import Tabs from "@atlaskit/tabs";
import React, { useState, useEffect } from "react";
import CommentsTab from './CommentsTab'
import { PotentialMatches } from "../Children/PotentialMatches";
import { AttachmentsPage } from "./tabs/Attachments/AttachmentsPage";
import { FamilyTreePage } from "./tabs/Tree/FamilyTreePage";
import { useLocation } from 'react-router-dom'

export const ChildTabs = ({ child, setChild }) => {
  const tabs = [
    { label: "Family Tree", content: <FamilyTreePage contacts={child.contacts || []} /> },
    { label: "Family Search" },
    { label: "Comments", defaultSelected:true, content: <CommentsTab child={child} setChild={setChild} />  },
    {
      label: "Attachments",
      content: <AttachmentsPage attachments={child.attachments} />,
    },
    { label: "Potential Matches",content: <PotentialMatches /> },
  ];

  const location = useLocation();
  const [i, setI] = useState(0)
  let index = 0;
  
  useEffect( ()=>{
      if(location.hash.length>0){
      let label = location.hash.substr(1);
      label = label.toUpperCase()[0] + label.slice(1);
      index = tabs.map(tab=>tab.label).indexOf(label);
      if(index > -1) setI(index);
    }
  },[location.hash.length])
  
  return <Tabs onSelect={(k,l)=>{setI(l);console.log('suka blyat');}} selected={tabs[i]} tabs={tabs} />;
};
