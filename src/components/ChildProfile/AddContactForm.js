import Button from "@atlaskit/button";
import { FormSection } from "@atlaskit/form";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { relationshipOptions } from "../../content/relationshipOptions.data";
import { states } from "../../content/states.data";
import { Box, Form, Spacing } from "../ui/atoms";
import { DatepickerInput, SelectInput, TextInput } from "../ui/molecules";

export const AddContactForm = ({ onSubmit, onCancel, initialValues = {} }) => {
  const { register, handleSubmit, control, errors, watch } = useForm({
    defaultValues: initialValues,
  });
  const [pending, setPending] = useState(false);
  const relationship = watch("relationship"); // you can supply default value as second argument

  const onSubmitHandle = (data) => {
    setPending(true);

    console.log(data);
    const { state, relationship, relationship_other, ...rest } = data;

    let submitData = rest;

    if (state?.value) {
      submitData.state = state.value;
    }
    if (relationship?.value) {
      submitData.relationship =
        relationship.value === "Other"
          ? relationship_other
          : relationship.value;
    }

    onSubmit(submitData);
  };

  return (
    <>
      <Form w="100%" onSubmit={handleSubmit(onSubmitHandle)} noValidate>
        <Spacing
          m={{ b: "30px" }}
          style={{
            display: "flex",
            flexWrap: "wrap",
            rowGap: 20,
            justifyContent: "flex-end",
          }}
        >
          <TextInput
            className="input"
            name={"first_name"}
            register={register({ required: true })}
            control={control}
            error={errors.first_name}
            label="First name"
          />
          <TextInput
            className="input"
            name={"last_name"}
            register={register({ required: false })}
            control={control}
            error={errors.last_name}
            label="Last name"
          />
          <SelectInput
            name={"relationship"}
            register={{ required: false }}
            control={control}
            options={relationshipOptions}
            error={errors.relationship}
            label="Relationship"
            placeholder="Relationship"
          />
          <TextInput
            className="input"
            name={"email"}
            register={register({
              required: false,
              pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
            })}
            control={control}
            error={errors.email}
            label="Email"
          />
          <TextInput
            name={"phone"}
            register={register({
              required: false,
            })}
            control={control}
            error={errors.phone}
            label="Phone"
            type={"phone"}
          />
          <TextInput
            className="input"
            name={"address"}
            register={register({ required: false })}
            control={control}
            error={errors.address}
            label="Address"
          />
          <TextInput
            className="input"
            name={"address_2"}
            register={register({ required: false })}
            control={control}
            error={errors.address_2}
            label="Another Address"
          />
          <TextInput
            name={"city"}
            register={register({ required: false })}
            control={control}
            error={errors.city}
            label="City"
          />
          <SelectInput
            menuPlacement="top"
            name={"state"}
            register={{ required: false }}
            control={control}
            options={states.map((state) => ({ label: state, value: state }))}
            error={errors.state}
            label="State"
            placeholder="Choose State"
          />

          <DatepickerInput
            name={"birthday"}
            register={{ required: false }}
            control={control}
            error={errors.birthday}
            label="Birthday"
            placeholder="Select birthday"
          />
          <TextInput
            name={"zip"}
            register={register({ required: false })}
            control={control}
            error={errors.zip}
            label="Zip"
          />

          {relationship?.value === "Other" ? (
            <TextInput
              className="input"
              name={"relationship_other"}
              register={register({ required: false })}
              control={control}
              error={errors.relationship_other}
              label="Relationship name"
            />
          ) : (
            <div style={{ width: 275, height: 50 }} />
          )}
          <Spacing m={{ r: "30px" }}>
            <Box d="flex">
              <Button isDisabled={pending} type="submit" appearance="primary">
                Save
              </Button>
              <Spacing m={{ l: "5px", r: "5px" }} />
              <Button onClick={onCancel}>Cancel</Button>
            </Box>
          </Spacing>
        </Spacing>
      </Form>
    </>
  );
};
