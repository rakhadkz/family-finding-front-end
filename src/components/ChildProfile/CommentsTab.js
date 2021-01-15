import React, { useEffect, useState } from "react";
import { postCommentRequest } from "../../api/comments";
import { fetchComments } from "../../context/children/childProvider";
import { Box, Spacing } from "../ui/atoms";
import { Comments } from "./Comments";
import { CommentsForm } from "./CommentsForm";
import { useAuth } from "../../context/auth/authContext";
import { fetchUsersRequest } from "../../api/user";
import { Avatar } from "../ui/molecules/Avatar";

export const CommentsTab = ({ childId, setChild }) => {
  const [comments, setComments] = useState([]);
  const [shouldUpdate, increaseShouldUpdate] = useState(1);
  const { user } = useAuth();
  const [mentions, setMentions] = useState();

  useEffect(() => {
    user &&
      fetchUsersRequest().then((response) =>
        setMentions(
          response.map((user) => ({
            name: `${user.first_name} ${user.last_name}`,
            title: "Staff of Penn State Orphanage",
            avatar:
              "https://pbs.twimg.com/profile_images/517863945/mattsailing_400x400.jpg",

            id: user.id,
          }))
        )
      );
  }, [user]);

  useEffect(() => {
    fetchComments(childId).then((items) => {
      if (items) {
        setComments(items.comments);
      }
    });
  }, [childId, shouldUpdate]);

  return (
    <Spacing m={{ t: "22px" }}>
      <Box d="flex">
        <Avatar name={`${user.first_name} ${user.last_name}`}/>
        <Spacing m={{ l: "17px", t: "-22px" }}>
          <CommentsForm
            shouldUpdate={shouldUpdate}
            increaseShouldUpdate={increaseShouldUpdate}
            id={childId}
            inReply={0}
            onSubmit={postCommentRequest}
            mentions={mentions}
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
                mentions={mentions}
                shouldUpdate={shouldUpdate}
                increaseShouldUpdate={increaseShouldUpdate}
              />
            ))}
      </Spacing>
    </Spacing>
  );
};
