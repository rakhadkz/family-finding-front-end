import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { formErrors } from "../../../helpers/formErrors";
import { Box, Label, StyledTextError } from "../atoms";
import PropTypes from "prop-types";
import { Controller } from "react-hook-form";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import MentionWysiwygEditor from './MentionWysiwygEditor'

export const WysiwygEditor = props => {
  const {
    mentions,
    onChange
  } = props;

  return (
    <StyledBox w="100%">
      <MentionWysiwygEditor mentions={mentions} onChange={onChange}/>
    </StyledBox>
  );
};

const StyledEditor = styled(MentionWysiwygEditor)`
  .hide-toolbar { display:none !important; }
`
const StyledBox = styled(Box)`
  margin: 10px;
  border: 1px solid rgb(215, 215, 215);
  .rdw-editor-main {
    padding: 0 20px 10px;
  }
`
  