import Button, { ButtonGroup } from "@atlaskit/button";
import { FormSection } from "@atlaskit/form";
import EmailIcon from "@atlaskit/icon/glyph/email";
import LockIcon from "@atlaskit/icon/glyph/lock";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../context/auth/authContext";
import { FORGOT_PASSWORD } from "../../helpers";
import { Form, Spacing } from "../ui/atoms";
import { TextInput } from "../ui/molecules";

export const LoginForm = ({ onSubmit }) => {
  const history = useHistory();
  const { register, handleSubmit, control, errors } = useForm();
  const { fetchMe } = useAuth()

  const [pending, setPending] = useState(false);

  const onSubmitHandle = (data) => {
    setPending(true);
    onSubmit(data, history)
      .finally(() => {
        setPending(true)
        fetchMe()
      })
  };

  return (
    <Form onSubmit={handleSubmit(onSubmitHandle)} noValidate>
      <FormSection>
        <TextInput
          name={"email"}
          register={register({ required: true, minLength: 5 })}
          control={control}
          error={errors.email}
          label="Email"
          elemBeforeInput={<EmailIcon primaryColor="#42526E" />}
        />

        <TextInput
          name={"password"}
          register={register({ required: true })}
          control={control}
          error={errors.password}
          label="Password"
          elemBeforeInput={<LockIcon primaryColor="#42526E" />}
        />
      </FormSection>
      <Spacing m={{ t: "20px" }}>
        <ButtonGroup>
          <Button
            isDisabled={pending}
            type="submit"
            appearance="primary"
            style={{ fontSize: 14 }}
          >
            Sign in
          </Button>
          <Button
            style={{ fontSize: 14 }}
            appearance="subtle"
            onClick={() => {
              history.push(`${FORGOT_PASSWORD}`);
            }}
          >
            Forgot password?
          </Button>
        </ButtonGroup>
      </Spacing>
    </Form>
  );
};
