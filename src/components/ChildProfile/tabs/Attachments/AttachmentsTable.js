import DynamicTable from "@atlaskit/dynamic-table";
import { TableWrapper } from "../../../ui/common";

const columns = [
  {
    key: "file_name",
    content: "File Name",
    width: 51,
  },
  {
    key: "size",
    content: "Size",
    width: 15,
  },
  {
    key: "author",
    content: "Author",
    width: 15,
  },
  {
    key: "date",
    content: "Date",
    width: 15,
  },
];

export const AttachmentsTable = ({ attachments }) => {
  return (
    <TableWrapper>
      <DynamicTable head={{ cells: columns }} rows={attachments} isFixedSize />
    </TableWrapper>
  );
};
