import PropTypes from "prop-types";
import React from "react";
import { Controller } from "react-hook-form";
import { formErrors } from "../../../helpers/formErrors";
import { Box, Label, StyledTextError } from "../atoms";
import styled from "styled-components";
import CalendarIcon from "@atlaskit/icon/glyph/calendar";
import { DatePicker } from "@atlaskit/datetime-picker";

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
    marginX = "0px",
    marginY = "5px",
    value,
  } = props;
  return (
    <StyledBox
      w={`${width}px`}
      mt={marginY}
      mb={marginY}
      ml={marginX}
      mr={marginX}
    >
      {label && <StyledLabel htmlFor={name}>{label}</StyledLabel>}
      <Controller
        format={"dd/MM/yyyy"}
        control={control}
        ref={register}
        rules={register}
        name={name}
        value={value || new Date()}
        as={DatePicker}
        defaultValue={new Date()}
        width={width}
        elemAfterInput={elemAfterInput}
        placeholder={placeholder}
        id={name}
        clearIcon={null}
        maxDate={new Date()}
        minDate={new Date(1899, 12, 31)}
        calendarIcon={<CalendarIcon />}
      />
      {error && (
        <StyledTextError>
          {error.message || formErrors[error?.type]}
        </StyledTextError>
      )}
    </StyledBox>
  );
};
const StyledBox = styled(Box)`
  display: flex;
  flex-direction: column;
`;
const StyledLabel = styled(Label)`
  margin-bottom: 4px;
  margin-top: 4px;
`;

DatepickerInput.propTypes = {
  name: PropTypes.string,
  register: PropTypes.any,
  errors: PropTypes.any,
  control: PropTypes.any.isRequired,
  elemBeforeInput: PropTypes.node,
  elemAfterInput: PropTypes.node,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  width: PropTypes.any,
  label: PropTypes.node,
};
