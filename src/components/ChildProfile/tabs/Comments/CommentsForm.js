import React, { useEffect, useState } from "react";
import { Form, Box } from "../../../ui/atoms";
import { useForm } from "react-hook-form";
import { FormSection } from "@atlaskit/form";
import { getLocalStorageUser } from "../../../../context/auth/authProvider";
import Button from "@atlaskit/button";
import styled from "styled-components";
import { WysiwygEditor } from "../../../WYSIWYG";
import { useHistory } from "react-router-dom";

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

  const history = useHistory();
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
    // console.log(text);
    // console.log(mentionedUsers);
    // console.log({
    //   comment: {
    //     body: text,
    //     in_reply_to: inReply,
    //     child_id: id,
    //     mentions: mentionedUsers,
    //   },
    // });

    onSubmit({
      comment: {
        body: text,
        in_reply_to: inReply,
        child_id: id,
        mentions: mentionedUsers,
      },
    })
      .then((items) => {
        // history.go(0);
        // setValue("");
        setUpd(upd + 1);
        increaseShouldUpdate(shouldUpdate + 1);
      })
      .finally(() => {
        setShowInput && setShowInput(false);
      });
  };

  const [upd, setUpd] = useState(1);
  // console.log(text, rawData);

  return (
    <Form w="100%" onSubmit={onSubmitHandle} noValidate>
      <FormSection>
        <WysiwygEditor
          mentions={mentions}
          upd={upd}
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
