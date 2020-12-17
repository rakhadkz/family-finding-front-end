import DynamicTable from "@atlaskit/dynamic-table";
import { useEffect } from "react";
import { Spacing } from "../atoms";
import { Pagination2 } from "./Pagination2";
import { TableWrapper } from "./TableWrapper";

export const Table2 = ({
  totalPage = null,
  setCurrentPage = null,
  items,
  pending = false,
  head,
  currentPage,
}) => {
  return (
    <div>
      {totalPage && (
        <Spacing m={{ b: "6px" }}>
          <Pagination2
            totalPage={totalPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
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
