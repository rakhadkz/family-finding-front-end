import { DatePicker } from "@atlaskit/datetime-picker";
import PropTypes from "prop-types";
import React from "react";
import { Controller } from "react-hook-form";
import { formErrors } from "../../../helpers/formErrors";
import { Box, Label, StyledTextError } from "../atoms";

export const DatepickerInput = (props) => {
  const {
    name,
    register,
    error,
    control,
    placeholder = null,
    elemAfterInput = null,
    width = 240,
    label = null,
  } = props;

  return (
    <Box w={`${width}px`}>
      {label && <Label htmlFor={name}>{label}</Label>}
      <Controller
        control={control}
        ref={register}
        rules={register}
        name={name}
        as={DatePicker}
        width={width}
        elemAfterInput={elemAfterInput}
        placeholder={placeholder}
        id={name}
      />
      {error && (
        <StyledTextError>
          {error.message || formErrors[error?.type]}
        </StyledTextError>
      )}
    </Box>
  );
};

DatepickerInput.propTypes = {
  name: PropTypes.string.isRequired,
  register: PropTypes.any.isRequired,
  errors: PropTypes.any.isRequired,
  control: PropTypes.any.isRequired,
  elemBeforeInput: PropTypes.node,
  elemAfterInput: PropTypes.node,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  width: PropTypes.number,
  label: PropTypes.node,
};
