import Avatar from "@atlaskit/avatar";
import React, { useEffect, useState } from "react";
import { postCommentRequest } from "../../../../api/comments";
import { fetchComments } from "../../../../context/children/childProvider";
import { Box, Spacing } from "../../../ui/atoms";
import { Comments } from "./Comments";
import { CommentsForm } from "./CommentsForm";
import { MentionsProvider } from "./mentions-context";
import styled from "styled-components";

export const CommentsTab = ({ childId, childComments, setChild }) => {
  const [comments, setComments] = useState(childComments);
  const [shouldUpdate, increaseShouldUpdate] = useState(0);
  const [show, handleShow] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const expandEditor = () => setIsExpanded(true);
  const collapseEditor = () => setIsExpanded(false);
  const [blocks, setBlocks] = useState(1);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        handleShow(true);
      } //else handleShow(false);
      return () => {
        window.removeEventListener("scroll");
      };
    });
  }, []);

  useEffect(() => {
    fetchComments(childId).then((items) => {
      if (items) {
        setComments(items.comments);
      }
    });
  }, [childId, shouldUpdate]);

  return (
    <MentionsProvider>
      <Spacing m={{ b: "22px" }}>
        <Spacing m={{ b: "22px" }}>
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
        <Footer d="flex" show={show} isExpanded={isExpanded} blocks={blocks}>
          <Avatar
            appearance="circle"
            src="https://pbs.twimg.com/profile_images/803832195970433027/aaoG6PJI_400x400.jpg"
            size="large"
          />
          <Spacing m={{ l: "17px", t: "-22px" }}>
            <CommentsForm
              setBlocks={setBlocks}
              isExpanded={isExpanded}
              collapseEditor={collapseEditor}
              expandEditor={expandEditor}
              shouldUpdate={shouldUpdate}
              increaseShouldUpdate={increaseShouldUpdate}
              id={childId}
              inReply={0}
              onSubmit={postCommentRequest}
            />
          </Spacing>
        </Footer>
      </Spacing>
    </MentionsProvider>
  );
};
//margin-bottom:50px;

const Footer = styled(Box)`
  ${(props) =>
    props.show &&
    `
  position: fixed;
  height:${
    props.show && props.isExpanded ? (200 * props.blocks).toString() : "50"
  }px;
  width: 100%;
  border: solid;
  border-radius: 5px;
  border-color: white;
  background-color: white;
  bottom: 0px;
  margin-bottom: 0px;
  `}
`;
