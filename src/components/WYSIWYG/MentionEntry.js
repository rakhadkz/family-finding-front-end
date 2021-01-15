import React from "react";
import styled from "styled-components";
const Entry = (props) => {
  const {
    mention,
    theme,
    searchValue, // eslint-disable-line no-unused-vars
    isFocused, // eslint-disable-line no-unused-vars
    ...parentProps
  } = props;

  return (
    <StyledEntry isFocused={isFocused}>
      <StyledEntryContainer>
        <StyledLeft>
          <StyledAvatar src={mention.avatar} role="presentation" />
        </StyledLeft>

        <StyledRight>
          <StyledText>{mention.name}</StyledText>

          <StyledTitle>{mention.title}</StyledTitle>
        </StyledRight>
      </StyledEntryContainer>
    </StyledEntry>
  );
};

const StyledEntry = styled.div`
  padding: 7px 10px 3px 10px;
  transition: background-color 0.4s cubic-bezier(0.27, 1.27, 0.48, 0.56);
  background-color: ${(props) => (props.isFocused ? "#cce7ff" : "")};
`;
const StyledText = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const StyledTitle = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 80%;
  color: #a7a7a7;
`;
const StyledEntryContainer = styled.div`
  display: table;
  width: 100%;
`;
const StyledRight = styled.div`
  display: table-cell;
  vertical-align: middle;
  width: 100%;
  padding-left: 8px;
`;
const StyledLeft = styled.div`
  display: table-cell;
  vertical-align: middle;
`;
const StyledAvatar = styled.img`
  display: block;
  width: 30px;
  height: 30px;
  border-radius: 50%;
`;

export default Entry;
