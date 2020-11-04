import Button, { ButtonGroup } from "@atlaskit/button";
import { FormHeader, FormSection } from "@atlaskit/form";
import LockIcon from "@atlaskit/icon/glyph/lock";
import React from "react";
import { useForm } from "react-hook-form";
import { Form, Spacing } from "../ui/atoms";
import { TextInput } from "../ui/molecules";

export const NewPasswordForm = () => {
  const { register, handleSubmit, control, errors, watch } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <Form onSubmit={handleSubmit(onSubmit)} noValidate>
      <FormSection>
        <FormHeader title="New password" />
        <TextInput
          name={"password"}
          register={register({ required: true })}
          control={control}
          error={errors.password}
          label="New password"
          elemBeforeInput={<LockIcon primaryColor="#42526E" />}
        />
        <TextInput
          name={"password_repeat"}
          register={register({
            required: true,
            validate: (value) =>
              value === watch("password") || "Passwords don't match.",
          })}
          control={control}
          type="password"
          error={errors["password_repeat"]}
          label="Repeat password"
          elemBeforeInput={<LockIcon primaryColor="#42526E" />}
        />
      </FormSection>
      <Spacing m={{ t: "20px" }}>
        <ButtonGroup>
          <Button style={{ fontSize: 14 }} type="submit" appearance="primary">
            Send
          </Button>
        </ButtonGroup>
      </Spacing>
    </Form>
  );
};
