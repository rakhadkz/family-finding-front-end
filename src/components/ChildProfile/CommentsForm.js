import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Box, Form, Label, Rectangle, Spacing, Title } from "../ui/atoms";
import { MentionInput } from "../ui/molecules";
import { useForm } from "react-hook-form";
import { FormSection } from "@atlaskit/form";
import { useHistory } from "react-router-dom";

const mentions = `
Andrew Stewart
Shyngys Rakhad
Murat Tishkul
Mura Tishkul
Murathan Tishkulbek
Bekzat Makhanbet`.split("\n");

function CommentsForm({ onSubmit }) {
  const history = useHistory();
  const { register, handleSubmit, control, errors } = useForm();
  const [pending, setPending] = useState(false);

  const onSubmitHandle = (data) => {
    setPending(true);
    // data.token = history.location.search.substring(7); // ?token=#{@token}
    // onSubmit(data)
    //   .then(() => history.push(`/`))
    //   .finally(() => setPending(false));
  };

  return (
    <Form w="100%" onSubmit={handleSubmit(onSubmitHandle)} noValidate>
      <FormSection>
        <MentionInput 
          name={"comments"}
          placeholder="Join the discussion"
          register={register}
          control={control}
          error={''}
          mentions={mentions}
        />
      </FormSection>
    </Form>
  )
}

export default CommentsForm
