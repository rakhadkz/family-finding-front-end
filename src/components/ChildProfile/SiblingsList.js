import React, { memo } from "react";
import styled from "styled-components";
import { Rectangle, Spacing, Title } from "../ui/atoms";
import { SiblingsItem } from "./SiblingsItem";

export const SiblingsList = memo(({ siblings }) => {
  return (
    <Rectangle p="14px 26px 14px 26px">
      <Title size="14px">Siblings</Title>
      <Spacing m={{ t: "8px" }}>
        <SiblingsListContainer>
          {siblings.map((siblings) => (
            <SiblingsItem sibling={siblings} />
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
