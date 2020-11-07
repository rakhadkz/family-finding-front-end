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
        as={Select}
        width={width}
        placeholder={placeholder}
        id={name}
        className="single-select"
        classNamePrefix="react-select"
        options={[
          { label: "Adelaide", value: "adelaide" },
          { label: "Brisbane", value: "brisbane" },
          { label: "Canberra", value: "canberra" },
          { label: "Darwin", value: "darwin" },
          { label: "Hobart", value: "hobart" },
          { label: "Melbourne", value: "melbourne" },
          { label: "Perth", value: "perth" },
          { label: "Sydney", value: "sydney" },
        ]}
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
  placeholder: PropTypes.string,
  type: PropTypes.string,
  width: PropTypes.number,
  label: PropTypes.node,
};
