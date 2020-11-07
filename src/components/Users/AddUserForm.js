import Button from "@atlaskit/button";
import { FormSection } from "@atlaskit/form";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { Box, Form, Spacing } from "../ui/atoms";
import { SelectInput, TextInput } from "../ui/molecules";

export const AddUserForm = ({ onSubmit }) => {
  const history = useHistory();
  const { register, handleSubmit, control, errors } = useForm();

  const [pending, setPending] = useState(false);
  const onSubmitHandle = (data) => {
    setPending(true);
    console.log(data);
  };

  const options = [
    { label: "Super admin", value: "super_admin" },
    { label: "Organization admin", value: "admin" },
    { label: "Organization manager", value: "manager" },
    { label: "Organization user", value: "user" },
  ];

  return (
    <Form w="100%" onSubmit={handleSubmit(onSubmitHandle)} noValidate>
      <FormSection>
        <Spacing m={{ t: "18px", b: "18px" }}>
          <Box d="flex" w="766px" justify="space-between">
            <TextInput
              name={"name"}
              register={register({ required: true })}
              control={control}
              error={errors.name}
              label="Name"
            />
            <TextInput
              name={"email"}
              register={register({ required: true })}
              control={control}
              error={errors.email}
              label="Email"
            />
            <TextInput
              name={"phone"}
              register={register({ required: true })}
              control={control}
              error={errors.phone}
              label="Phone"
            />
          </Box>
        </Spacing>
        <TextInput
          name={"organization"}
          register={register({ required: true })}
          control={control}
          error={errors.organization}
          label="Organization"
        />
        <Spacing m={{ t: "33px" }}>
          <SelectInput
            name={"role"}
            options={options}
            register={register({ required: true })}
            control={control}
            error={errors.role}
            placeholder="Choose role"
          />
        </Spacing>
        <Button
          style={{ position: "absolute", top: 80, right: 40 }}
          isDisabled={pending}
          type="submit"
          appearance="primary"
        >
          Save
        </Button>
      </FormSection>
    </Form>
  );
};
