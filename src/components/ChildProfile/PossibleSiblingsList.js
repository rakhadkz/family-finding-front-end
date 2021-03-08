import React, { memo } from "react";
import styled from "styled-components";
import { Rectangle, Spacing, Title } from "../ui/atoms";
import { SiblingsItem } from "./SiblingsItem";

export const PossibleSiblingsList = memo(({ siblings, createSiblings }) => {
  return (
    <Rectangle p="14px 26px 14px 26px">
      <Title size="14px">Possible siblings</Title>
      <Spacing m={{ t: "8px" }}>
        <SiblingsListContainer>
          {siblings.map((siblings) => (
            <SiblingsItem
              onAdd={() => createSiblings(siblings?.sibling.id)}
              sibling={siblings}
            />
          ))}
        </SiblingsListContainer>
      </Spacing>
    </Rectangle>
  );
});

const SiblingsListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
