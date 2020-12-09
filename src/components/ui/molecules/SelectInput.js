import { Field } from "@atlaskit/form";
import Select from "@atlaskit/select";
import PropTypes from "prop-types";
import React from "react";
import { Controller } from "react-hook-form";
import { formErrors } from "../../../helpers/formErrors";
import { Box, Label, StyledTextError } from "../atoms";

export const SelectInput = (props) => {
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
    isMulti = false,
    options,
    defaultValue = null,
  } = props;

  return (
    <Box w={`${width}px`} mr="35px">
      {label && <Label htmlFor={name}>{label}</Label>}
      <Controller
        control={control}
        ref={{ register }}
        isMulti={isMulti}
        rules={register}
        name={name}
        defaultValue={defaultValue}
        as={Select}
        width={width}
        elemAfterInput={elemAfterInput}
        placeholder={placeholder}
        id={name}
        className="multi-select"
        classNamePrefix="react-select"
        options={options}
      />
      {error && (
        <StyledTextError>
          {error.message || formErrors[error?.type]}
        </StyledTextError>
      )}
    </Box>
  );
};

SelectInput.propTypes = {
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
