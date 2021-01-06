import React, { useEffect, useState } from "react";
import { Form, Box, StyledTextError } from "../ui/atoms";
import { MentionInput } from "../ui/molecules";
import { useForm } from "react-hook-form";
import { FormSection } from "@atlaskit/form";
import { fetchUsersRequest } from "../../api/user";
import { getLocalStorageUser } from "../../context/auth/authProvider";
import Button from "@atlaskit/button";
import ButtonGroup from "@atlaskit/button/button-group";
import styled from "styled-components";
import { Controller } from "react-hook-form";
import { formErrors } from "../../helpers/formErrors";
import draftToHtml from "draftjs-to-html";
import { EditorState, RichUtils, convertToRaw } from "draft-js";
import { WysiwygEditor } from "../WYSIWYG";
export const CommentsForm = ({
  onSubmit,
  id,
  inReply,
  shouldUpdate,
  increaseShouldUpdate,
  setShowInput,
  mentions,
}) => {
  const user = getLocalStorageUser();
  const {
    register,
    handleSubmit,
    control,
    errors,
    reset,
    formState: { isSubmitSuccessful },
  } = useForm({
    mode: "onChange",
  });

  const getMentionedUsers = (text) => {
    let res = [];
    for (let i = 0; i < text.length; i++) {
      if (text[i] === "@" && (i === 0 || text[i - 1] === " ")) {
        // if find mentions
        let j,
          s = 0;
        for (j = 1; j + i < text.length && s !== 1; j++) {
          // find last index of mention
          if (text[i + j] === " ") s++;
        }
        let name = text.slice(i + 1, i + j - 1);
        console.log(name);
        console.log(mentions);
        // let users = user.user_organizations[0].organization.users
        // for(let k=0;k<users.length;k++){
        //   console.log(users[k])
        //   if( users[k].first_name === name){
        //     res.push(users[k].id);
        //     console.log(users[k]);
        //     break;
        //   }
        // }
      }
    }
    return res;
  };
  const [text, setText] = useState("");
  const [styles, setStyles] = useState("");
  const [rawData, setRawData] = useState("");

  const onSubmitHandle = async () => {
    let mentionedUsers = [];
    for (let key in rawData.entityMap) {
      if (rawData.entityMap[key].type === "mention") {
        mentionedUsers.push(rawData.entityMap[key].data.mention.id);
      }
    }
    console.log(text);
    console.log(mentionedUsers);
    console.log({
      comment: {
        body: text,
        in_reply_to: inReply,
        child_id: id,
        mentions: mentionedUsers,
      },
    });

    onSubmit({
      comment: {
        body: text,
        in_reply_to: inReply,
        child_id: id,
        mentions: mentionedUsers,
      },
    })
      .then((items) => {
        increaseShouldUpdate(shouldUpdate + 1);
      })
      .finally(() => {
        setShowInput && setShowInput(false);
      });
  };

  console.log(text, rawData);

  return (
    <Form w="100%" onSubmit={onSubmitHandle} noValidate>
      <FormSection>
        <WysiwygEditor
          name="comment"
          mentions={mentions}
          onChange={(tex, raw) => {
            setText(tex);
            setRawData(raw);
          }}
        />
        <StyledButtonGroup>
          <Button type="submit" appearance="primary">
            Send
          </Button>
           
          <Button
            appearance="subtle"
            onClick={() => setShowInput && setShowInput(false)}
          >
            Cancel
          </Button>
        </StyledButtonGroup>
      </FormSection>
    </Form>
  );
};

const StyledButtonGroup = styled(Box)`
  margin: 0 10px;
`;
