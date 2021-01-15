import React, { useState, useEffect } from "react";
import { Form, Box, Spacing } from "../../../ui/atoms";
import { FormSection } from "@atlaskit/form";
import Button from "@atlaskit/button";
import { WysiwygEditor } from "../../../WYSIWYG";
import styled from "styled-components";
import { useMentions } from "./mentions-context";
import { TextInput } from "../../../ui/molecules";

export const CommentsForm = ({
  onSubmit,
  id,
  inReply,
  shouldUpdate,
  increaseShouldUpdate,
  setShowInput,
  isExpanded,
  collapseEditor,
  expandEditor,
  setBlocks,
}) => {
  const [upd, setUpd] = useState(1);
  const [text, setText] = useState("");
  const [htmlText, setHtmlText] = useState("");
  const [rawData, setRawData] = useState("");

  const onSubmitHandle = async () => {
    let mentionedUsers = [];
    for (let key in rawData.entityMap) {
      if (rawData.entityMap[key].type === "mention") {
        mentionedUsers.push(rawData.entityMap[key].data.mention.id);
      }
    }
    // console.log("THIS IS TEXT", text);
    // console.log("THIS IS RAWDATA", rawData);
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
        html_body: htmlText,
        body: text,
        in_reply_to: inReply,
        child_id: id,
        mentions: mentionedUsers,
      },
    })
      .then((items) => {
        setUpd(upd + 1);
        increaseShouldUpdate(shouldUpdate + 1);
      })
      .finally(() => {
        setShowInput && setShowInput(false);
      });
  };

  return (
    <Form w="100%" onSubmit={onSubmitHandle} noValidate>
      <FormSection>
        {isExpanded ? (
          <>
            <Spacing m={{ l: "-17px" }}>
              <WysiwygEditor
                upd={upd}
                onChange={(tex, raw, html) => {
                  setText(tex);
                  setRawData(raw);
                  setHtmlText(html);
                }}
                setBlocks={setBlocks}
              />
              <StyledButtonGroup>
                <Button type="submit" appearance="primary">
                  Send
                </Button>

                <Button
                  appearance="subtle"
                  onClick={() =>
                    collapseEditor() && setShowInput && setShowInput(false)
                  }
                >
                  Cancel
                </Button>
              </StyledButtonGroup>
            </Spacing>
          </>
        ) : (
          <TextInput onClick={expandEditor} placeholder="Add a comment..." />
        )}
      </FormSection>
    </Form>
  );
};

const StyledButtonGroup = styled(Box)`
  margin: 0 10px;
`;
