import Button, { ButtonGroup } from "@atlaskit/button";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { Box, Form } from "../ui/atoms";
import { DatepickerInput, SelectInput, TextInput } from "../ui/molecules";
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
}) => {
  const history = useHistory();
  const { register, handleSubmit, control, errors } = useForm({
    defaultValues: child
      ? {
          first_name: child.first_name,
          last_name: child.last_name,
          birthday: new Date(child.birthday),
        }
      : {},
  });

  const [pending, setPending] = useState(false);
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
        <SelectInput
          width="100%"
          defaultValue={
            child?.permanency_goal &&
            getObjectByValue(permanency_goal_options, child.permanency_goal)
          }
          name="permanency_goal"
          control={control}
          error={errors.permanency_goal}
          label="Permanency Goal"
          placeholder="Choose status"
          options={permanency_goal_options}
        />
        <SelectInput
          defaultValue={
            child?.gender && getObjectByValue(sex_options, child.gender)
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
            child?.race && getObjectByValue(race_options, child.race)
          }
          width="100%"
          name="race"
          control={control}
          error={errors.race}
          label="Race"
          menuPlacement="top"
          options={race_options}
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
  array.find((object) => object.label === value);
