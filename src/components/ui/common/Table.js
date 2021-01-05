import DynamicTable from "@atlaskit/dynamic-table";
import { Box } from "../atoms";
import { TableWrapper } from "./TableWrapper";
import Pagination from '@atlaskit/pagination';

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
        <Box d="flex" justify="center" mb="6px">
          <Pagination defaultSelectedIndex={currentPage - 1} pages={pagesArray(totalPage)} onChange={(e, page) => setCurrentPage(page)}/>
        </Box>
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

const pagesArray = (totalPage) => {
  const pages = [];
  for (var i = 1; i <= totalPage; ++i){
    pages.push(i);
  }
  return pages;
}