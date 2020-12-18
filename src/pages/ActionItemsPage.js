import React, { useEffect, useState } from "react";
import { Spacing, Title } from "../components/ui/atoms";
import { ModalDialog, Sidebar } from "../components/ui/common";
import { Table } from "../components/ui/common/Table";
import { SidebarTemplate } from "../components/ui/templates";
import { actionItemTableData } from "../content/actionItem.data";
import { actionItemsTableColumns } from "../content/columns.data";
import { fetchActionItems } from "../context/actionItems/actionItemProvider";
import { useHistory } from "react-router-dom";
import { ACTION_ITEMS } from "../helpers/routes";
import {
  deleteActionItem,
} from "../context/actionItems/actionItemProvider";

export const ActionItemsPage = (props) => {
  const [items, setItems] = useState([]);
  const [tablePending, setTablePending] = useState(true);
  const [totalPage, setTotalPage] = useState(null);
  const query = new URLSearchParams(props.location.search);
  const [isOpen, setIsOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [currentItem, setCurrentItem] = useState(-1);
  const history = useHistory();
  var currentPage = query.get("page") || 1;

  const onDelete = (id) => {
    setRefresh(true);
    deleteActionItem(id).finally(() => {
      setRefresh(false);
      setIsOpen(false);
      history.push(`${ACTION_ITEMS}`);
    });
  };
  
  useEffect(() => {
    fetchActionItems({ page: currentPage, meta: true })
      .then((response) => {
        if(response) {
          const items = response.data;
          setTotalPage(response.meta?.num_pages);
          setItems(actionItemTableData(items, history, null, setIsOpen, setCurrentItem));
        }
      })
      .finally(() => setTablePending(false));
  }, [refresh]);
  
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
      <ModalDialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onClick={() => onDelete(currentItem)}
        positiveLabel="Delete"
        heading="Are you sure you want to remove this action?"
        body="You will no longer have access to this item"
        appearance="danger"
      />
    </SidebarTemplate>
  );
};
