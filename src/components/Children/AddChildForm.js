import Button, { ButtonGroup } from "@atlaskit/button";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { Box, Form, Label } from "../ui/atoms";
import { DatepickerInput, SelectInput, TextInput } from "../ui/molecules";
import { Checkbox } from "@atlaskit/checkbox";
import {
  sex_options,
  race_options,
  permanency_goal_options,
} from "../../helpers";

export const AddChildForm = ({
  onSubmit,
  child,
  setIsOpenEdit,
  fetch,
  setIsImportOpen,
  schoolDistrictOptions = [],
}) => {
  const history = useHistory();
  const { register, handleSubmit, control, errors } = useForm({
    defaultValues: child
      ? {
          first_name: child.first_name,
          last_name: child.last_name,
          birthday: new Date(child.birthday),
          date_entered_foster_care: child.date_entered_foster_care ? new Date(child.date_entered_foster_care) : null
        }
      : {},
  });
  const [pending, setPending] = useState(false);
  const [isChecked, setIsChecked] = useState(
    child && child.system_status === "Active" ? true : false
  );
  const onSubmitHandle = (data) => {
    setPending(true);
    if (child) {
      data.id = child.id;
    }
    onSubmit({
      ...data,
      gender: data.gender?.value || null,
      race: data.race?.value || null,
      permanency_goal: data.permanency_goal?.value || null,
      school_district_id: data.school_district_id?.value || null,
      system_status: isChecked ? "active" : "inactive",
    })
      .then(() => {
        toast.success(
          child ? "Child successfully updated" : "Child successfully created!"
        );
        setPending(false);
        if (setIsOpenEdit) {
          fetch();
          setIsOpenEdit(false);
        } else {
          history.goBack();
        }
      })
      .finally(() => {
        setPending(false);
        if (setIsOpenEdit) {
          setIsOpenEdit(false);
        }
      });
  };

  return (
    <Form
      w="100%"
      justify="center"
      direction="row"
      onSubmit={handleSubmit(onSubmitHandle)}
      noValidate
    >
      <Box w="450px">
        <TextInput
          width="100%"
          name="first_name"
          register={register({ required: true })}
          control={control}
          error={errors.first_name}
          label="First name"
        />
        <TextInput
          width="100%"
          name="last_name"
          register={register({ required: true })}
          control={control}
          error={errors.last_name}
          label="Last name"
        />
        <DatepickerInput
          width="100%"
          name="birthday"
          control={control}
          error={errors.birthday}
          label="Birthday"
          placeholder="Select birthday of child"
        />
        <DatepickerInput
          width="100%"
          name="date_entered_foster_care"
          control={control}
          error={errors.date_entered_foster_care}
          label="Date Entered Foster Care"
          placeholder="Select the date a child has entered foster care"
        />
        <SelectInput
          width="100%"
          name="school_district_id"
          defaultValue={
            child?.school_district_id &&
            getObjectByValue(schoolDistrictOptions, child?.school_district_id)
          }
          control={control}
          error={errors.school_district_id}
          label="School District"
          placeholder="Select School District"
          options={schoolDistrictOptions}
        />
        <SelectInput
          width="100%"
          defaultValue={
            child?.permanency_goal &&
            getObjectByLabel(permanency_goal_options, child.permanency_goal)
          }
          name="permanency_goal"
          control={control}
          error={errors.permanency_goal}
          label="Permanency Goal"
          placeholder="Select status"
          options={permanency_goal_options}
        />
        <SelectInput
          defaultValue={
            child?.gender && getObjectByLabel(sex_options, child.gender)
          }
          width="100%"
          name="gender"
          control={control}
          error={errors.gender}
          label="Sex"
          options={sex_options}
        />
        <SelectInput
          defaultValue={
            child?.race && getObjectByLabel(race_options, child.race)
          }
          width="100%"
          name="race"
          control={control}
          error={errors.race}
          label="Race"
          menuPlacement="top"
          options={race_options}
        />
        <Label>System Status</Label>
        <Checkbox
          value="Active"
          label="Active"
          isChecked={isChecked}
          onChange={() => setIsChecked((item) => !item)}
          name="system-status"
          style={{ width: "auto" }}
        />
        <Box mt="16px" d="flex" justify="center">
          <ButtonGroup>
            <Button appearance="primary" isDisabled={pending} type="submit">
              {child ? "Update Child" : "Add New Child"}
            </Button>
            {setIsOpenEdit ? (
              <Button
                appearance="subtle"
                isDisabled={pending}
                onClick={() => setIsOpenEdit(false)}
              >
                Cancel
              </Button>
            ) : (
              <Button onClick={() => setIsImportOpen(true)}>Import</Button>
            )}
          </ButtonGroup>
        </Box>
      </Box>
    </Form>
  );
};

export const getObjectByValue = (array, value) =>
  array.find((object) => object.value === value);

export const getObjectByLabel = (array, label) =>
  array.find((object) => object.label === label);
