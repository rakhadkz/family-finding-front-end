import Tabs from "@atlaskit/tabs";
import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { constructTree } from "../../content/childContact.tree.data";
import { childContactsTableData } from "../../content/childContacts.data";
import { contactsTableColumns } from "../../content/columns.data";
import { Connections } from "./tabs/Connections/Connections";
import { Spacing } from "../ui/atoms";
import { Table } from "../ui/common/Table";
import { CommentsTab } from "./tabs/Comments/CommentsTab";
import { AttachmentsPage } from "./tabs/Attachments/AttachmentsPage";
import { FamilyTreePage } from "./tabs/Tree/FamilyTreePage";

export const ChildTabs = (
  {
    id,
    first_name: firstName,
    last_name: lastName,
    comments = [],
    contacts = [],
    family_tree = [],
    attachments = [],
    refreshContacts,
  },
  setChild
) => {
  console.log(firstName, lastName, contacts, family_tree);

  const tabs = [
    {
      label: "Family Tree",
      content: (
        <div>
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
            refreshContacts={refreshContacts}
          />
          <Spacing m={{ t: "20px" }}>
            <Table
              items={childContactsTableData(contacts)}
              head={contactsTableColumns}
            />
          </Spacing>
        </div>
      ),
    },
    { label: "Family Search" },
    {
      label: "Comments",
      content: (
        <CommentsTab
          childId={id}
          childComments={comments}
          setChild={setChild}
        />
      ),
    },
    {
      label: "Attachments",
      content: <AttachmentsPage child_id={id} attachments={attachments} />,
    },
    {
      label: "Connections",
      content: <Connections contacts={contacts} childId={id} />,
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
    <Tabs
      isContentPersisted
      onSelect={selectTab}
      selected={tabs[current]}
      tabs={tabs}
    />
  ) : null;
};
