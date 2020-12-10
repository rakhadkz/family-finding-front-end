import Tabs from "@atlaskit/tabs";
import React, { useState, useEffect } from "react";
import { CommentsTab } from './CommentsTab'
import { PotentialMatches } from "../Children/PotentialMatches";
import { AttachmentsPage } from "./tabs/Attachments/AttachmentsPage";
import { FamilyTreePage } from "./tabs/Tree/FamilyTreePage";
import { useLocation, useHistory } from 'react-router-dom';

export const ChildTabs = ({ child, setChild }) => {
  const tabs = [
    { 
      label: "Family Tree", 
      content: <FamilyTreePage contacts={child.contacts || []} /> 
    },
    { 
      label: "Family Search",
      content: <div></div> },
    { 
      label: "Comments", 
      content: <CommentsTab child={child} setChild={setChild} />  
    },
    {
      label: "Attachments",
      content: <AttachmentsPage attachments={child.attachments} />,
    },
    { 
      label: "Potential Matches",
      content: <PotentialMatches /> 
    },
  ];
  const location = useLocation();
  const [current, setCurrent] = useState(0);
  let history = useHistory();
  // use history.push('/some/path') here
  
  useEffect( ()=>{
    if(location.hash.length>0){
      let label = location.hash.substr(1);
      let index = tabs.map(tab=>tab.label.replace(/\s+/g, '-').toLowerCase()).indexOf(label);
      if(index > -1) setCurrent(index);
    }
  },[location.hash.length])

  const selectTab = (tab,index) => {
    setCurrent(index);
    history.push(`#${tab.label.replace(/\s+/g, '-').toLowerCase()}`);
  }
  
  return <Tabs onSelect={selectTab} selected={tabs[current]} tabs={tabs} />;
};