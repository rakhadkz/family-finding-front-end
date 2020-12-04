import DynamicTable from "@atlaskit/dynamic-table";
import { TableWrapper } from "../../../ui/common";

const columns = [
  {
    key: "full_name",
    content: "Full name",
    width: 20,
  },
  {
    key: "relationship",
    content: "Relationship",
    width: 16,
  },
  {
    key: "birth_date",
    content: "Birth date",
    width: 12,
  },
  {
    key: "address",
    content: "Address",
    width: 37,
  },
  {
    key: "phone",
    content: "Phone number",
    width: 11,
  },
];

export const ContactsTable = ({ contacts }) => (
  <TableWrapper>
    <DynamicTable head={{ cells: columns }} rows={contacts} />
  </TableWrapper>
);
