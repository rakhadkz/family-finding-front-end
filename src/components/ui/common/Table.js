import DynamicTable from "@atlaskit/dynamic-table";
import { useEffect } from "react";
import { Spacing } from "../atoms";
import { Pagination } from "./Pagination";
import { TableWrapper } from "./TableWrapper";

export const Table = ({
  totalPage = null,
  currentPage = null,
  items,
  pending = false,
  head,
}) => {
  useEffect(() => {
    fetch({});
  });
  return (
    <div>
      {totalPage && (
        <Spacing m={{ b: "6px" }}>
          <Pagination totalPage={totalPage} currentPage={currentPage} />
        </Spacing>
      )}
      <TableWrapper>
        <DynamicTable
          isLoading={pending}
          head={{ cells: head }}
          rows={items}
          emptyView="No content"
          isFixedSize
        />
      </TableWrapper>
    </div>
  );
};
