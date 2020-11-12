import Textfield from "@atlaskit/textfield";
import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import { formErrors } from "../../../helpers/formErrors";
import { Box, Label, StyledTextError } from "../atoms";

export const TextInput = (props) => {
  const {
    name,
    register,
    error,
    control,
    type,
    placeholder = null,
    elemBeforeInput = null,
    elemAfterInput = null,
    width = 240,
    label = null,
  } = props;

  return (
    <Box w={`${width}px`}>
      {label && <Label htmlFor={name}>{label}</Label>}
      <StyledTextField
        controls={control}
        ref={register}
        elemBeforeInput={elemBeforeInput}
        elemAfterInput={elemAfterInput}
        name={name}
        placeholder={placeholder}
        id={name}
        type={type || name}
        width={width}
        isCompact
      />
      {error && (
        <StyledTextError>
          {error.message || formErrors[error?.type]}
        </StyledTextError>
      )}
    </Box>
  );
};

const StyledTextField = styled(Textfield)`
  min-height: 36px;
`;

TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  register: PropTypes.any.isRequired,
  errors: PropTypes.any.isRequired,
  control: PropTypes.any.isRequired,
  elemBeforeInput: PropTypes.node,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  label: PropTypes.node,
};