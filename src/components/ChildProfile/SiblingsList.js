import React, { memo } from "react";
import styled from "styled-components";
import { Box, Spacing, Title } from "../ui/atoms";
import { SiblingsItem } from "./SiblingsItem";

export const SiblingsList = memo(
  ({ siblings, childId, onRemoveSiblingship }) => {
    console.log(siblings);
    return (
      <Spacing>
        <Title size="16px">Siblings</Title>
        <Spacing m={{ t: "8px" }}>
          <SiblingsListContainer>
            {siblings.map((siblings, index) => (
              <div key={index}>
                <SiblingsItem
                  visibleRemove={true}
                  onDelete={() => onRemoveSiblingship(siblings.id)}
                  sibling={
                    childId === siblings.sibling.id
                      ? siblings.child
                      : siblings.sibling
                  }
                  siblingType={siblings?.sibling_type}
                />
              </div>
            ))}
            <Box d="flex" justify="center" align="center"></Box>
          </SiblingsListContainer>
        </Spacing>
      </Spacing>
    );
  }
);

const SiblingsListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
