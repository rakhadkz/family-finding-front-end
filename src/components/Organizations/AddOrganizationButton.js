import Button from "@atlaskit/button";
import OfficeBuilding from "@atlaskit/icon/glyph/office-building";
import styled from "styled-components";

export const AddOrganizationButton = ({ onClick }) => {
  return (
    <ButtonWrapper>
      <Button appearance="primary" onClick={onClick}>
        <ButtonContentWrapper>
          <OfficeBuilding />
          Add organization
        </ButtonContentWrapper>
      </Button>
    </ButtonWrapper>
  );
};

const ButtonWrapper = styled.div``;

const ButtonContentWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-family: Helvetica;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  width: 150px;
`;
