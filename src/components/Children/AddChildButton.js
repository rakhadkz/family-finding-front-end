import Button from "@atlaskit/button";
import EmojiAddIcon from "@atlaskit/icon/glyph/emoji-add";
import styled from "styled-components";

export const AddChildButton = ({ onClick }) => {
  return (
    <ButtonWrapper>
      <Button appearance="primary" onClick={onClick}>
        <ButtonContentWrapper>
          <EmojiAddIcon />
          Add Child
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
  width: 119px;
`;
