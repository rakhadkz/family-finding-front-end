import Button from "@atlaskit/button";
import PersonIcon from "@atlaskit/icon/glyph/person";
import styled from "styled-components";

export const AddUserButton = ({ onClick }) => {
  return (
    <ButtonWrapper>
      <Button appearance="primary" onClick={onClick}>
        <ButtonContentWrapper>
          <PersonIcon />
          Add user
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
  width: 117px;
`;
