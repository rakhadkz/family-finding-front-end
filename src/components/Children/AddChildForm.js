import Button, { ButtonGroup } from "@atlaskit/button";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { Box, Form } from "../ui/atoms";
import { DatepickerInput, SelectInput, TextInput } from "../ui/molecules";

const permanency_goal_options = [
  {
    value: "return_to_parent",
    label: "Return to Parent(s) (Reunification)",
  },
  {
    value: "adoption",
    label: "Adoption",
  },
  {
    value: "permanent_legal_custody",
    label: "Permanent Legal Custody (PLC)",
  },
  {
    value: "permanent_placement",
    label: "Permanent Placement with a Fit and Willing Relative",
  },
  {
    value: "appla",
    label: "Another Planned Permanent Living Arrangement (APPLA)",
  },
];

const gender_options = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
];

const race_options = [
  {
    value: "american_indian_or_alaska_native",
    label: "American Indian or Alaska Native",
  },
  {
    value: "asian",
    label: "Asian",
  },
  {
    value: "black_or_african_american",
    label: "Black or African American",
  },
  {
    value: "hispanic_or_latino",
    label: "Hispanic or Latino",
  },
  {
    value: "native_hawaiian_or_other_pacific_islander",
    label: "Native Hawaiian or Other Pacific Islander",
  },
  {
    value: "white",
    label: "White",
  },
];

export const AddChildForm = ({
  onSubmit,
  child,
  setIsOpenEdit,
  fetch,
  setIsImportOpen,
}) => {
  const history = useHistory();
  const { register, handleSubmit, control, errors, setValue } = useForm();

  useEffect(() => {
    if (child) {
      setValue("first_name", child.first_name);
      setValue("last_name", child.last_name);
      setValue("birthday", new Date(child.birthday));
    }
  }, [child]);

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
            child?.gender && getObjectByValue(gender_options, child.gender)
          }
          width="100%"
          name="gender"
          control={control}
          error={errors.gender}
          label="Gender"
          options={gender_options}
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
        <Box mt="16px">
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
