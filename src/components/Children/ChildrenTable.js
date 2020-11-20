import DynamicTable from "@atlaskit/dynamic-table";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { childTableData } from "../../content/child.data";
import { tableData } from "../../content/sample.data";
import { fetchChildren } from "../../context/children/childProvider";

const TableCell = styled.span`
  font-family: Helvetica;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;

  color: #172b4d;
`;

const columns = [
  {
    key: "full_name",
    content: "Full Name",
    width: 30,
  },
  {
    key: "permanency_goal",
    content: "Permanency Goal",
    width: 15,
  },
  {
    key: "continuous_search",
    content: "Continuous Search",
    width: 14,
  },
  {
    key: "days_in_system",
    content: "Days in system",
    width: 12,
  },
  {
    key: "relatives",
    content: "Relatives",
    width: 12,
  },
  {
    key: "matches",
    content: "Matches",
    width: 12,
  },
];

export const ChildrenTable = () => {
  const [children, setChildren] = useState([]);

  useEffect(() => {
    fetchChildren("table").then((items) => {
      if (items) setChildren(childTableData(items));
    });
  }, []);

  return (
    <TableWrapper>
      <DynamicTable
        head={{ cells: columns }}
        rows={children}
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