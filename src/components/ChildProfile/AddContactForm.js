import Button, { ButtonGroup } from "@atlaskit/button";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { relationshipOptions } from "../../content/relationshipOptions.data";
import { states } from "../../content/states.data";
import { getObjectByValue } from "../Children";
import { Box, Form, Spacing } from "../ui/atoms";
import { DatepickerInput, SelectInput, TextInput } from "../ui/molecules";

export const AddContactForm = ({
  onSubmit,
  onCancel,
  initialValues = {},
  contact,
}) => {
  const { register, handleSubmit, control, errors, watch, setValue } = useForm({
    defaultValues: initialValues,
  });
  const [pending, setPending] = useState(false);
  const relationship = watch("relationship"); // you can supply default value as second argument

  useEffect(() => {
    if (contact) {
      console.log("EDITABLE CONTACT: ", contact);
      contact.first_name && setValue("first_name", contact.first_name);
      contact.last_name && setValue("last_name", contact.last_name);
      contact.relationship && setValue("relationship", contact.relationship);
      contact.email && setValue("email", contact.email);
      contact.phone && setValue("phone", contact.phone);
      contact.address && setValue("address", contact.address);
      contact.address_2 && setValue("address_2", contact.address_2);
      contact.city && setValue("city", contact.city);
      contact.birthday && setValue("birthday", new Date(contact.birthday));
      contact.zip && setValue("zip", contact.zip);
    }
  }, [contact]);

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
          m={{ b: "15px" }}
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <TextInput
            marginX="8px"
            className="input"
            name={"first_name"}
            register={register({ required: true })}
            control={control}
            error={errors.first_name}
            label="First name"
          />
          <TextInput
            marginX="8px"
            className="input"
            name={"last_name"}
            register={register({ required: false })}
            control={control}
            error={errors.last_name}
            label="Last name"
          />
          <SelectInput
            defaultValue={
              contact?.relationship &&
              getObjectByValue(relationshipOptions, contact?.relationship)
            }
            marginX="8px"
            name={"relationship"}
            register={{ required: false }}
            control={control}
            options={relationshipOptions}
            error={errors.relationship}
            label="Relationship"
            placeholder="Relationship"
          />
          <TextInput
            marginX="8px"
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
            marginX="8px"
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
            marginX="8px"
            className="input"
            name={"address"}
            register={register({ required: false })}
            control={control}
            error={errors.address}
            label="Address"
          />
          <TextInput
            marginX="8px"
            className="input"
            name={"address_2"}
            register={register({ required: false })}
            control={control}
            error={errors.address_2}
            label="Another Address"
          />
          <TextInput
            marginX="8px"
            name={"city"}
            register={register({ required: false })}
            control={control}
            error={errors.city}
            label="City"
          />
          <SelectInput
            defaultValue={
              contact?.state && { label: contact?.state, value: contact?.state }
            }
            marginX="8px"
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
            marginX="8px"
            name={"birthday"}
            register={{ required: false }}
            control={control}
            error={errors.birthday}
            label="Birthday"
            placeholder="Select birthday"
          />
          <TextInput
            marginX="8px"
            name={"zip"}
            register={register({ required: false })}
            control={control}
            error={errors.zip}
            label="Zip"
          />

          {relationship?.value === "Other" ? (
            <TextInput
              marginX="8px"
              className="input"
              name={"relationship_other"}
              register={register({ required: false })}
              control={control}
              error={errors.relationship_other}
              label="Relationship name"
            />
          ) : (
            <div style={{ width: 250 }} />
          )}
        </Spacing>
        <Box d="flex" w="100%" justify="center" mb="20px">
          <ButtonGroup>
            <Button isDisabled={pending} type="submit" appearance="primary">
              Save
            </Button>
            <Button onClick={onCancel}>Cancel</Button>
          </ButtonGroup>
        </Box>
      </Form>
    </>
  );
};
