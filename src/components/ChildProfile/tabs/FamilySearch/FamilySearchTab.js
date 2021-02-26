import Button, { ButtonGroup } from "@atlaskit/button";
import React, { useContext, useState } from "react";
import { ChildContext } from "../../../../pages/ChildProfilePage";
import { Box, Spacing } from "../../../ui/atoms";
import { FamilySearchItem, AddSearchResultForm } from "./";

export function FamilySearchTab() {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const {
    searchResultState: { searchResults, loading },
    fetchSearchResults,
  } = useContext(ChildContext);
  return (
    <div style={{ width: "100%" }}>
      <Spacing m={{ t: "23px", b: "40px" }}>
        <Box w="100%" d="flex" direction="row-reverse">
          <ButtonGroup appearance="primary">
            {!isFormVisible && (
              <Button onClick={() => setIsFormVisible(true)}>
                Add New Search Result
              </Button>
            )}
            <Button>Export Search Result</Button>
          </ButtonGroup>
        </Box>
        <Spacing
          m={{ b: "15px" }}
          style={{ display: isFormVisible ? "block" : "none" }}
        >
          <AddSearchResultForm
            setIsFormVisible={setIsFormVisible}
            fetch={fetchSearchResults}
          />
        </Spacing>

        <Spacing m={{ t: "20px" }}>
          {searchResults.map(
            (item) => item && <FamilySearchItem item={item} />
          )}
        </Spacing>
      </Spacing>
    </div>
  );
}
