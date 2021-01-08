import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Spacing, Title } from "../components/ui/atoms";
import { Sidebar } from "../components/ui/common";
import { Table } from "../components/ui/common/Table";
import { SidebarTemplate } from "../components/ui/templates";
import { actionItemTableData } from "../content/actionItem.data";
import { actionItemsTableColumns } from "../content/columns.data";
import { fetchActionItems } from "../context/actionItems/actionItemProvider";

export const ActionItemsPage = (props) => {
  const query = new URLSearchParams(props.location.search);
  const history = useHistory();
  const [ items, setItems ] = useState([]);
  const [ tablePending, setTablePending ] = useState(true);
  const [ totalPage, setTotalPage ] = useState(null);
  const [ refresh, setRefresh ] = useState(false);
  const [ currentPage, setCurrentPage ] = useState(query.get("page") || 1);

  useEffect(() => {
    history.push(`?page=${currentPage}`);
    fetchActionItems({ page: currentPage, meta: true })
      .then((response) => {
        if(response) {
          const items = response.data;
          setTotalPage(response.meta?.num_pages);
          setItems(actionItemTableData(items, setRefresh, setTablePending));
        }
      })
      .finally(() => setTablePending(false));
  }, [refresh, currentPage]);
  
  return (
    <SidebarTemplate sidebar={<Sidebar />}>
      <Title>Action Items</Title>
      <Spacing m={{ t: "29px" }}>
        <Table
          totalPage={totalPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          items={items}
          head={actionItemsTableColumns}
          pending={tablePending}
        />
      </Spacing>
    </SidebarTemplate>
  );
};
