import Button, { ButtonGroup } from "@atlaskit/button";
import React, { useState } from "react";
import { Box, Spacing } from "../../../ui/atoms";
import { FamilySearchItem, AddSearchResultForm } from "./";

export function FamilySearchTab() {
  const [isFormVisible, setIsFormVisible] = useState(false);

  return (
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
        <AddSearchResultForm setIsFormVisible={setIsFormVisible} />
      </Spacing>

      <Spacing m={{ t: "20px" }}>
        <FamilySearchItem />
        <FamilySearchItem />
        <FamilySearchItem />
        <FamilySearchItem />
      </Spacing>
    </Spacing>
  );
}
