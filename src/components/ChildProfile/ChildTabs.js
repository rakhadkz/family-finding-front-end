import Tabs from "@atlaskit/tabs";
import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { fetchChildrenRequest } from "../../api/children";
import { constructTree } from "../../content/childContact.tree.data";
import { AttachmentsPage } from "./tabs/Attachments/AttachmentsPage";
import { CommentsTab } from "./tabs/Comments/CommentsTab";
import { Connections } from "./tabs/Connections/Connections";
import { FamilyTreePage } from "./tabs/Tree/FamilyTreePage";

export const ChildTabs = (
  {
    id,
    fetchChildProfile,
    first_name: firstName,
    last_name: lastName,
    family_tree = [],
  },
  setChild
) => {
  const [contacts, setContacts] = useState([]);
  const [trigger, setTrigger] = useState(false);

  const fetchChildren = async () => {
    await fetchChildProfile();
    await fetchChildrenRequest({ id: id, view: "contacts" }).then((data) =>
      setContacts(data.contacts)
    );
  };

  useEffect(() => {
    fetchChildren();
  }, [trigger]);

  const tabs = [
    {
      label: "Connections",
      content: (
        <Connections
          contacts={contacts}
          initialContacts={contacts}
          treeContacts={constructTree({
            contacts: family_tree,
            firstName,
            lastName,
          })}
          childId={id}
          firstName={firstName}
          lastName={lastName}
          setContacts={setContacts}
          refreshContacts={setTrigger}
        />
      ),
    },
    {
      label: "Family Tree",
      content: (
        <FamilyTreePage
          childId={id}
          firstName={firstName}
          lastName={lastName}
          initialContacts={contacts}
          contacts={constructTree({
            contacts: family_tree,
            firstName,
            lastName,
          })}
          refreshContacts={fetchChildProfile}
        />
      ),
    },
    { label: "Family Search" },
    {
      label: "Comments",
      content: <CommentsTab childId={id} setChild={setChild} />,
    },
    {
      label: "Attachments",
      content: <AttachmentsPage child_id={id} />,
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
