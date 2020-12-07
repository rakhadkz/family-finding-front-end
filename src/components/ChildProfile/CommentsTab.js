import Avatar from "@atlaskit/avatar";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Box, Form, Label, Rectangle, Spacing, Title } from "../ui/atoms";
import { MentionInput } from "../ui/molecules";
import { useForm } from "react-hook-form";
import Comments from './Comments'
import { fetchComments } from "../../context/children/childProvider";
import { FormSection } from "@atlaskit/form";
import { useHistory } from "react-router-dom";
import CommentsForm from './CommentsForm'
import { postCommentRequest } from '../../api/comments'
import { fetchChildren } from "../../context/children/childProvider";

function CommentsTab({ child, setChild}) {
  const history = useHistory();
  const [comments, setComments] = useState(child.comments);
  const [shouldUpdate, increaseShouldUpdate] = useState(0)

  useEffect(
    () => {
      console.log(child.id)
      fetchComments(child.id).then((items) => {
        if (items) {
          setComments(items.comments);
          console.log(items)
        }
      });
    }, [child, dummy]);

  return (
    <Spacing m={{ t: "22px" }}>
      <Box d="flex">
        <Avatar
          appearance="circle"
          src="https://pbs.twimg.com/profile_images/803832195970433027/aaoG6PJI_400x400.jpg"
          size="large"
        />
        <Spacing m={{ l: "17px", t: "-22px" }}>
          <CommentsForm 
            shouldUpdate={shouldUpdate} 
            increaseShouldUpdate={increaseShouldUpdate} 
            id={child.id} 
            setChild={setChild} 
            inReply={0} 
            onSubmit={postCommentRequest} />
        </Spacing>
      </Box>
      <Spacing m={{ t: "22px"}}>
        { comments && comments.filter( comment => !comment.in_reply_to ).map ( comment => <Comments data={comment}/> )}
      </Spacing>
    </Spacing>
  )
}

export default CommentsTab
