import React from "react";
import styled from "styled-components";
import { Rectangle, Spacing, Title } from "../ui/atoms";
import { RelativeItem } from "./RelativeItem";

export const RelativesList = ({ relatives }) => {
  return (
    <Rectangle p="14px 26px 14px 26px">
      <Title size="14px">Relatives ({relatives?.length})</Title>
      <Spacing m={{ t: "8px" }}>
        <RelativeListContainer>
          {relatives.map((relative) => (
            <RelativeItem relative={relative} />
          ))}
        </RelativeListContainer>
      </Spacing>
    </Rectangle>
  );
};

const RelativeListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
