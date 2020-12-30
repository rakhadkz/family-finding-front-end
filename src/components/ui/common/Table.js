import DynamicTable from "@atlaskit/dynamic-table";
import { Spacing } from "../atoms";
import { Pagination } from "./Pagination";
import { TableWrapper } from "./TableWrapper";

export const Table = ({
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
          <Pagination
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