import DynamicTable from "@atlaskit/dynamic-table";
import { useEffect } from "react";
import styled from "styled-components";
import { tableData } from "../../content/sample.data";
import { useOrganization } from "../../context/organization/organizationContext";

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

export const OrganizationsTable = () => {
  const { organizations, fetchOrganizations } = useOrganization();

  useEffect(() => {
    fetchOrganizations();
  }, [fetchOrganizations]);

  return (
    <TableWrapper>
      <DynamicTable
        head={{ cells: columns }}
        rows={organizations ? tableData(organizations, columns) : []}
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
