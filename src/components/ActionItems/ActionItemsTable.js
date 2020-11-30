import DynamicTable from "@atlaskit/dynamic-table";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { actionItemTableData } from "../../content/actionItem.data";
import { fetchActionItems } from "../../context/actionItems/actionItemProvider";

const TableCell = styled.span`
  font-family: Helvetica;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  margin-top: 40px;
  color: #172b4d;
`;

const columns = [
  {
    key: "title",
    content: "Title",
    width: 30,
  },
  {
    key: "description",
    content: "Description",
    width: 21,
  },
  {
    key: "user",
    content: "Assignee",
    width: 10,
  },
  {
    key: "child",
    content: "Associated Child Case",
    width: 18,
  },
  {
    key: "status",
    content: "Status",
    width: 7,
  },
  {
    key: "resolve",
    content: "Resolve",
    width: 10,
  },
];

export const ActionItemsTable = () => {
  const [actionItems, setActionItems] = useState([]);
  useEffect(() => {
    fetchActionItems().then((items) => {
      if (items) setActionItems(actionItemTableData(items));
    });
  }, []);

  return (
    <TableWrapper>
      <DynamicTable
        head={{ cells: columns }}
        rows={actionItems}
        loadingSpinnerSize="large"
        isLoading={false}
        isFixedSize
      />
    </TableWrapper>
  );
};

const TableWrapper = styled.div`
  width: 100%;
`;
