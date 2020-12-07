import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { Box, Form, Label, Rectangle, Spacing, Title } from "../ui/atoms";
import { MentionInput } from "../ui/molecules";
import { useForm } from "react-hook-form";
import { FormSection } from "@atlaskit/form";
import { useHistory } from "react-router-dom";
import Button from "@atlaskit/button";
import { reset } from "../../context/auth/authProvider";

const mentions = `
Andrew Stewart
Shyngys Rakhad
Murat Tishkul
Mura Tishkul
Murathan Tishkulbek
Bekzat Makhanbet`.split("\n");

function CommentsForm({ onSubmit, id, inReply, shouldUpdate, increaseShouldUpdate}) {
  const history = useHistory();
  const { register, handleSubmit, control, errors , reset, formState: { isSubmitSuccessful }} = useForm();
  const [pending, setPending] = useState(false);

  const onSubmitHandle = (data) => {
    setPending(true);
    console.log(data)
    onSubmit({
      "comment": {
        "body": data.comment,
        "in_reply_to": inReply,
        "child_id" : id,
      }
    })
    .then((items) => {
      increaseShouldUpdate(shouldUpdate+1); 
    })
    .finally(() => {setPending(false); }  );
  };

  return (
    <Form w="100%" onSubmit={handleSubmit(onSubmitHandle)} noValidate>
      <FormSection>
        <MentionInput 
          name={"comment"}
          placeholder="Join the discussion"
          register={register}
          control={control}
          error={''}
          mentions={mentions}
          reset={reset}
          isSubmitSuccessful={isSubmitSuccessful}
        />
      </FormSection>
    </Form>
  )
}

export default CommentsForm
