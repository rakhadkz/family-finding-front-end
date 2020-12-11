import React, { useEffect, useState } from "react";
import { Spacing, Title } from "../components/ui/atoms";
import { Sidebar } from "../components/ui/common";
import { Table } from "../components/ui/common/Table";
import { SidebarTemplate } from "../components/ui/templates";
import { actionItemTableData } from "../content/actionItem.data";
import { fetchActionItems } from "../context/actionItems/actionItemProvider";
import { actionItemsTableColumns } from "../content/columns.data";

export const ActionItemsPage = (props) => {
  const [items, setItems] = useState([]);
  const [tablePending, setTablePending] = useState(true);
  const [totalPage, setTotalPage] = useState(null);
  const query = new URLSearchParams(props.location.search);
  var currentPage = query.get("page") || 1;
  useEffect(() => {
    fetchActionItems({ page: currentPage, meta: true })
      .then((response) => {
        const items = response.data;
        setTotalPage(response.meta.num_pages);
        setItems(actionItemTableData(items));
      })
      .finally(() => setTablePending(false));
  }, []);
  return (
    <SidebarTemplate sidebar={<Sidebar />}>
      <Title>Action Items</Title>
      <Spacing m={{ t: "29px" }}>
        <Table
          totalPage={totalPage}
          currentPage={currentPage}
          items={items}
          head={actionItemsTableColumns}
          pending={tablePending}
        />
      </Spacing>
    </SidebarTemplate>
  );
};
