import DynamicTable from "@atlaskit/dynamic-table";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { organizationTableData } from "../../content/organization.data";
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

export const OrganizationsTable = ({
  fetch,
  isConcreteOrganization = false,
  id = 0,
}) => {
  const [organizations, setOrganizations] = useState([]);
  const history = useHistory();
  useEffect(() => {
    fetch({ id: id }).then(
      (items) =>
        items &&
        setOrganizations(
          organizationTableData(items, isConcreteOrganization, history)
        )
    );
  }, []);

  return (
    <TableWrapper>
      <DynamicTable
        head={{ cells: columns }}
        rows={organizations}
        loadingSpinnerSize="large"
        isLoading={false}
        isFixedSize
      />
    </TableWrapper>
  );
};
