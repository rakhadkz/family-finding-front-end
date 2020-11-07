import Button from "@atlaskit/button";
import { FormSection } from "@atlaskit/form";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { Box, Form, Spacing } from "../ui/atoms";
import { SelectInput, TextInput } from "../ui/molecules";
import { SelectOrganizationLogo } from "./SelectOrganizationLogo";

export const AddOrganizationForm = ({ onSubmit }) => {
  const history = useHistory();
  const { register, handleSubmit, control, errors } = useForm();

  const [pending, setPending] = useState(false);

  const onSubmitHandle = (data) => {
    setPending(true);
    console.log(data);
    // onSubmit(data)
    //   .then(() => history.goBack())
    //   .finally(() => setPending(false));
  };

  return (
    <Form w="100%" onSubmit={handleSubmit(onSubmitHandle)} noValidate>
      <FormSection>
        <TextInput
          name={"name"}
          register={register({ required: true })}
          control={control}
          error={errors.name}
          label="Name"
        />
        <Spacing m={{ t: "18px" }}>
          <Box d="flex" w="100%" justify="space-between">
            <TextInput
              name={"address"}
              register={register({ required: true })}
              control={control}
              error={errors.address}
              label="Address"
            />
            <TextInput
              name={"city"}
              register={register({ required: true })}
              control={control}
              error={errors.city}
              label="City"
            />
            <SelectInput
              name={"state"}
              register={register({ required: true })}
              control={control}
              error={errors.state}
              label="State"
              placeholder="Choose State"
            />
            <TextInput
              name={"zip"}
              register={register({ required: true })}
              control={control}
              error={errors.zip}
              label="Zip"
            />
          </Box>
        </Spacing>
        <SelectOrganizationLogo
          control={control}
          register={register({ required: true })}
        />
      </FormSection>
      <Button
        style={{ position: "absolute", top: 80, right: 40 }}
        isDisabled={pending}
        type="submit"
        appearance="primary"
      >
        Save
      </Button>
    </Form>
  );
};
