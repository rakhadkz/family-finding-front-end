import Avatar from "@atlaskit/avatar";
import React, { useEffect, useState } from "react";
import { postCommentRequest } from "../../../../api/comments";
import { fetchComments } from "../../../../context/children/childProvider";
import { Box, Spacing } from "../../../ui/atoms";
import { Comments } from "./Comments";
import { CommentsForm } from "./CommentsForm";
import { MentionsProvider } from "./mentions-context";
export const CommentsTab = ({ childId, childComments, setChild }) => {
  const [comments, setComments] = useState(childComments);
  const [shouldUpdate, increaseShouldUpdate] = useState(0);

  useEffect(() => {
    fetchComments(childId).then((items) => {
      if (items) {
        setComments(items.comments);
      }
    });
  }, [childId, shouldUpdate]);

  return (
    <MentionsProvider>
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
              id={childId}
              inReply={0}
              onSubmit={postCommentRequest}
            />
          </Spacing>
        </Box>
        <Spacing m={{ t: "22px" }}>
          {comments &&
            comments
              .filter((comment) => !comment.in_reply_to)
              .sort((a, b) => a.created_at - b.created_at)
              .map((comment) => (
                <Comments
                  id={childId}
                  data={comment}
                  shouldUpdate={shouldUpdate}
                  increaseShouldUpdate={increaseShouldUpdate}
                />
              ))}
        </Spacing>
      </Spacing>
    </MentionsProvider>
  );
};
