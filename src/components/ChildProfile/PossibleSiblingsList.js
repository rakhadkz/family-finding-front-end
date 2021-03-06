import React, { memo } from "react";
import styled from "styled-components";
import { Spacing, Title } from "../ui/atoms";
import { SiblingsItem } from "./SiblingsItem";

export const PossibleSiblingsList = memo(({ siblings, createSiblings }) => {
  return (
    <Spacing m="20px 0px 0px 0px">
      {siblings?.length ? <Title size="16px">Possible siblings</Title> : null}
      <Spacing m={{ t: "8px" }}>
        <SiblingsListContainer>
          {siblings.map((siblings, index) => (
            <div key={index}>
              <SiblingsItem
                onAdd={(siblingType) =>
                  createSiblings(siblings?.sibling.id, siblingType)
                }
                sibling={siblings?.sibling}
              />
            </div>
          ))}
        </SiblingsListContainer>
      </Spacing>
    </Spacing>
  );
});

const SiblingsListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  min-height: 0px;
`;
