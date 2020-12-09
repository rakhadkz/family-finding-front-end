import React, { useEffect, useState } from "react";
import { Spacing, Title } from "../components/ui/atoms";
import { Sidebar } from "../components/ui/common";
import { Table } from "../components/ui/common/Table";
import { SidebarTemplate } from "../components/ui/templates";
import { actionItemTableData } from "../content/actionItem.data";
import { fetchActionItems } from "../context/actionItems/actionItemProvider";
import { actionItemsTableColumns } from "../content/columns.data";

export const ActionItemsPage = () => {
  const [items, setItems] = useState([]);
  const [tablePending, setTablePending] = useState(true);
  useEffect(() => {
    fetchActionItems()
      .then((items) => setItems(actionItemTableData(items)))
      .finally(() => setTablePending(false));
  }, []);
  return (
    <SidebarTemplate sidebar={<Sidebar />}>
      <Title>Action Items</Title>
      <Spacing m={{ t: "29px" }}>
        <Table
          items={items}
          head={actionItemsTableColumns}
          pending={tablePending}
        />
      </Spacing>
    </SidebarTemplate>
  );
};
