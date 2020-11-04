import Textfield from "@atlaskit/textfield";
import PropTypes from "prop-types";
import React from "react";
import { formErrors } from "../../../helpers/formErrors";
import { Label, StyledTextError } from "../atoms";

export const TextInput = (props) => {
  const {
    name,
    register,
    error,
    control,
    placeholder = null,
    elemBeforeInput = null,
    width = 240,
    label = null,
  } = props;

  return (
    <>
      {label && <Label htmlFor={name}>{label}</Label>}
      <Textfield
        controls={control}
        ref={register}
        elemBeforeInput={elemBeforeInput}
        name={name}
        placeholder={placeholder}
        id={name}
        type={name}
        width={width}
        isCompact
      />
      {error && <StyledTextError>{formErrors[error?.type]}</StyledTextError>}
    </>
  );
};

TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  register: PropTypes.any.isRequired,
  errors: PropTypes.any.isRequired,
  control: PropTypes.any.isRequired,
  elemBeforeInput: PropTypes.node,
  placeholder: PropTypes.string,
  width: PropTypes.number,
  label: PropTypes.node,
};
