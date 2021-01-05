import React from "react";
import styled from "styled-components";
import { Box } from "../ui/atoms";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import MentionWysiwygEditor from "./MentionWysiwygEditor";

export const WysiwygEditor = (props) => {
  const { mentions, onChange } = props;

  return (
    <StyledBox w="100%">
      <MentionWysiwygEditor mentions={mentions} onChange={onChange} />
    </StyledBox>
  );
};

const StyledEditor = styled(MentionWysiwygEditor)`
  .hide-toolbar {
    display: none !important;
  }
`;
const StyledBox = styled(Box)`
  margin: 10px;
  border: 1px solid rgb(215, 215, 215);
  .rdw-editor-main {
    padding: 0 20px 10px;
  }
`;
