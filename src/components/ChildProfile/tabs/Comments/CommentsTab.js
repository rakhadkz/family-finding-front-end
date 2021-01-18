import React, { useEffect, useState, useRef } from "react";
import { postCommentRequest } from "../../../../api/comments";
import { fetchComments } from "../../../../context/children/childProvider";
import { Box, Spacing } from "../../../ui/atoms";
import { Comments } from "./Comments";
import { CommentsForm } from "./CommentsForm";
import { useAuth } from "../../../../context/auth/authContext";
import { fetchUsersRequest } from "../../../../api/user";
import { Avatar } from "../../../ui/molecules/Avatar";
import { MentionsProvider } from "./mentions-context";
import styled from "styled-components";

export const CommentsTab = ({ childId, childComments, setChild }) => {
  const { user } = useAuth();
  const [comments, setComments] = useState(childComments);
  const [shouldUpdate, increaseShouldUpdate] = useState(0);
  const [show, handleShow] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [blocks, setBlocks] = useState(1);
  const myRef = useRef(null);

  const executeScroll = () =>
    myRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
  console.log(comments, show, comments?.length);

  const expandEditor = () => setIsExpanded(true);
  const collapseEditor = () => {
    setIsExpanded(false);
    handleShow(false);
    setBlocks(1);
  };

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 150) {
        handleShow(true);
      } else {
        if (comments && comments?.length > 6) handleShow(false);
      }
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

  useEffect(() => {
    if (show) executeScroll();
  }, [isExpanded, blocks]);

  useEffect(() => {
    if (show && comments[comments.length - 1].in_reply_to === null)
      executeScroll();
  }, [comments]);

  return (
    <MentionsProvider>
      <Spacing
        m={{ b: isExpanded ? `${(140 + 20 * blocks).toString()}px` : "50px" }}
      >
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
        <span ref={myRef} />
        <Footer d="flex" show={show} isExpanded={isExpanded} blocks={blocks}>
          <Avatar name={`${user?.first_name} ${user?.last_name}`} />
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

const Footer = styled(Box)`
  ${(props) =>
    props.show &&
    `
    transition: 0.5s;
  position: fixed;
  height:${
    props.show && props.isExpanded ? (170 + 20 * props.blocks).toString() : "50"
  }px;
  width: 100%;
  border: hidden;
  border-radius: 5px;
  border-color: white;
  background-color: white;
  bottom: 0px;
  margin-bottom: 0px;
  `}
`;
