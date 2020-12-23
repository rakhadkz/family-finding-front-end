import React, { useEffect, useState } from "react";
import { Form } from "../ui/atoms";
import { MentionInput } from "../ui/molecules";
import { useForm } from "react-hook-form";
import { FormSection } from "@atlaskit/form";
import { useAuth } from "../../context/auth/authContext";
import { fetchUsersRequest } from "../../api/user";

export const CommentsForm = ({ onSubmit, id, inReply, shouldUpdate, increaseShouldUpdate, setShowInput}) => {
  const { user } = useAuth();
  const { register, handleSubmit, control, errors , reset, formState: { isSubmitSuccessful }} = useForm();
  const [mentions, setMentions] = useState();
  const [selected, setSelected] = useState();

  useEffect(() => {
    user && fetchUsersRequest().then(response => setMentions(response.map(user => `${user.first_name} ${user.last_name}`)))
  }, [user]);

  const getMentionedUsers = (text) => {
    let res = [];
    for(let i =0; i<text.length;i++){
      if( text[i] == '@' && (i==0 || text[i-1]==' ') ){ // if find mentions
        let j, s  = 0;
        for(j=1;j+i<text.length && s!=1;j++){ // find last index of mention
          if(text[i+j]==' ') s++;
        }
        let name = text.slice(i+1,i+j-1);
        console.log(name);
        let users = user.user_organizations[0].organization.users
        for(let k=0;k<users.length;k++){
          console.log(users[k])
          if( users[k].first_name === name){
            res.push(users[k].id);
            console.log(users[k]);
            break;
          }
        }
      }
    }
    return res;
  }

  const onSubmitHandle = async (data) => {
    console.log(data)
    const mentionedUsers = getMentionedUsers(data.comment)
    console.log(mentionedUsers)
    onSubmit({
      "comment": {
        "body": data.comment,
        "in_reply_to": inReply,
        "child_id" : id,
        "mentions": mentionedUsers ? mentionedUsers : []
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
          mentions={mentions || []}
          reset={reset}
          isSubmitSuccessful={isSubmitSuccessful}
        />
      </FormSection>
    </Form>
  )
}
