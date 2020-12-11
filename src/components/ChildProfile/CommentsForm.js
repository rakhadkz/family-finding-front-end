import React, { useEffect, useState } from "react";
import { Form } from "../ui/atoms";
import { MentionInput } from "../ui/molecules";
import { useForm } from "react-hook-form";
import { FormSection } from "@atlaskit/form";
import { useAuth } from "../../context/auth/authContext";

export const CommentsForm = ({ onSubmit, id, inReply, shouldUpdate, increaseShouldUpdate, setShowInput}) => {
  const { user } = useAuth();
  const { register, handleSubmit, control, errors , reset, formState: { isSubmitSuccessful }} = useForm();
  const [mentions, setMentions] = useState();

  useEffect( () => {
    user && setMentions(user.user_organizations[0].organization.users.map(user=>`${user.first_name} ${user.last_name}`));
  }, [user]);

  const onSubmitHandle = async (data) => {
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
    .finally(() => { setShowInput && setShowInput(false) });
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
