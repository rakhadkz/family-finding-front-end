import DynamicTable from "@atlaskit/dynamic-table";
import { TableWrapper } from "../ui/common";

const columns = [
  {
    key: "name",
    content: "Name",
    width: 25,
  },
  {
    key: "address",
    content: "Address",
    width: 33,
  },
  {
    key: "city",
    content: "City",
    width: 15,
  },
  {
    key: "state",
    content: "State",
    width: 15,
  },
  {
    key: "zip",
    content: "Zip",
    width: 8,
  },
];

export const OrganizationsTable = ({ items }) => {
  return (
    <TableWrapper>
      <DynamicTable
        head={{ cells: columns }}
        rows={items}
        loadingSpinnerSize="large"
        isFixedSize
      />
    </TableWrapper>
  );
};
