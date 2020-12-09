import Avatar from "@atlaskit/avatar";
import React, { useState, useEffect } from "react";
import { Box, Spacing } from "../ui/atoms";
import { Comments } from './Comments'
import { fetchComments } from "../../context/children/childProvider";
import {CommentsForm} from './CommentsForm'
import { postCommentRequest } from '../../api/comments'

export const CommentsTab = ({ child, setChild}) => {
  const [comments, setComments] = useState(child.comments);
  const [shouldUpdate, increaseShouldUpdate] = useState(0)

  useEffect(
    () => {
      fetchComments(child.id).then((items) => {
        if (items) {
          setComments(items.comments);
        }
      });
    }, [child, shouldUpdate]);

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
            inReply={0} 
            onSubmit={postCommentRequest} 
          />
        </Spacing>
      </Box>
      <Spacing m={{ t: "22px"}}>
        { comments && 
            comments.filter( comment => !comment.in_reply_to ).map ( 
              comment => 
                <Comments
                  id={child.id} 
                  data={comment}  
                  shouldUpdate={shouldUpdate} 
                  increaseShouldUpdate={increaseShouldUpdate} 
                /> 
              )}
      </Spacing>
    </Spacing>
  )
};
