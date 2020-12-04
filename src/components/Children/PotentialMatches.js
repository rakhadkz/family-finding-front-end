import DynamicTable from "@atlaskit/dynamic-table";
import styled from "styled-components";
import { potentialMatchesTableData } from "../../content/potentialMatches.data";
import { Spacing } from "../ui/atoms";

const columns = [
  {
    key: "full_name",
    content: "Full Name",
    width: 18,
  },
  {
    key: "relationship",
    content: "Relationship",
    width: 11,
  },
  {
    key: "phone",
    content: "Phone Number",
    width: 11,
  },
  {
    key: "email",
    content: "Email",
    width: 25,
  },
  {
    key: "rating",
    content: "Rating",
    width: 15,
  },
  {
    key: "status",
    content: "Status",
    width: 16,
  },
];

const rows = [
  {
    first_name: "Bekzat",
    last_name: "Makhanbet",
    relationship: "Brother",
    phone: "666-555-44-22",
    email: "makhanbet.kyzylorda@gmail.com",
    rating: 4,
  },
];

export const PotentialMatches = () => {
  return (
    <Spacing m={{ t: "25px" }}>
      <TableWrapper>
        <DynamicTable
          head={{ cells: columns }}
          loadingSpinnerSize="large"
          isLoading={false}
          rows={potentialMatchesTableData(rows)}
          isFixedSize
        />
      </TableWrapper>
    </Spacing>
  );
};

const TableWrapper = styled.div`
  width: 100%;
`;
