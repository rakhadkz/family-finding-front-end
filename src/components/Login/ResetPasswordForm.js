import Button, { ButtonGroup } from "@atlaskit/button";
import { FormHeader, FormSection } from "@atlaskit/form";
import EmailIcon from "@atlaskit/icon/glyph/email";
import React from "react";
import { useForm } from "react-hook-form";
import { Form, Spacing } from "../ui/atoms";
import { TextInput } from "../ui/molecules";

export const ResetPasswordForm = () => {
  const { register, handleSubmit, control, errors } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <Form onSubmit={handleSubmit(onSubmit)} noValidate>
      <FormSection>
        <FormHeader title="Forgot password?" />
        <TextInput
          name="email"
          register={register({ required: true })}
          control={control}
          error={errors.email}
          label="Email"
          elemBeforeInput={<EmailIcon primaryColor="#42526E" />}
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
