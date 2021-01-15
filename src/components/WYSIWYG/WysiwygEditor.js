import React, { useState } from "react";
import styled from "styled-components";
import { Box } from "../ui/atoms";
import MentionWysiwygEditor from "./MentionWysiwygEditor";
export const WysiwygEditor = (props) => {
  const { onChange, upd, setBlocks } = props;
  return (
    <StyledBox w="100%">
      <MentionWysiwygEditor
        setBlocks={setBlocks}
        upd={upd}
        onChange={onChange}
      />
    </StyledBox>
  );
};

const StyledBox = styled(Box)`
  margin: 10px;
  border: 1px solid rgb(215, 215, 215);
  .rdw-editor-main {
    padding: 0 20px 10px;
  }
`;
