import React, { useEffect, useState, useRef } from "react";
import { postCommentRequest } from "../../../../api/comments";
import { fetchComments } from "../../../../context/children/childProvider";
import { Box, Spacing } from "../../../ui/atoms";
import { Comments } from "./Comments";
import { CommentsForm } from "./CommentsForm";
import { useAuth } from "../../../../context/auth/authContext";
import { Avatar } from "../../../ui/molecules/Avatar";
import styled from "styled-components";
import Spinner from "@atlaskit/spinner";

const StyledSpinner = () => (
  <Box
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      margin: "50px",
      width: "100vh",
    }}
  >
    <Spinner size="large" />
  </Box>
);

export const CommentsTab = ({ childId, childComments, setChild }) => {
  const { user } = useAuth();
  const [comments, setComments] = useState(childComments);
  const [allComments, setAllComments] = useState(childComments);
  const [shouldUpdate, increaseShouldUpdate] = useState(0);
  const [show, handleShow] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [blocks, setBlocks] = useState(1);
  const [suggestions, setSuggestions] = useState(0);
  const myRef = useRef(null);

  const executeScroll = () =>
    myRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
  // console.log(comments, show, comments?.length);

  const expandEditor = () => setIsExpanded(true);
  const collapseEditor = () => {
    setIsExpanded(false);
    handleShow(false);
    setBlocks(1);
  };

  const fetch = () => {
    fetchComments(childId).then((items) => {
      // console.log(items.comments);
      if (items) {
        setComments(
          items.comments
            .filter((comment) => !comment.in_reply_to)
            .sort(
              (a, b) =>
                new Date(a.created_at).getTime() -
                new Date(b.created_at).getTime()
            )
        );
        setAllComments(
          items.comments.sort(
            (a, b) =>
              new Date(a.created_at).getTime() -
              new Date(b.created_at).getTime()
          )
        );
      }
    });
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
    fetch();
  }, [childId, shouldUpdate]);

  useEffect(() => {
    if (show) {
      executeScroll();
    }
  }, [isExpanded, blocks]);

  useEffect(() => {
    if (
      show &&
      allComments &&
      allComments[allComments.length - 1].in_reply_to === null
    ) {
      executeScroll();
    }
  }, [comments, allComments]);

  return (
    <Spacing
      m={{
        b: isExpanded
          ? `${(140 + 25 * blocks + 35 * suggestions).toString()}px`
          : "50px",
      }}
    >
      {comments ? (
        <Spacing m={{ b: "22px" }}>
          {comments &&
            comments.map((comment, index) => (
              <Comments
                childId={childId}
                data={comment}
                key={comment.id}
                fetch={fetch}
                shouldUpdate={shouldUpdate}
                increaseShouldUpdate={increaseShouldUpdate}
              />
            ))}
        </Spacing>
      ) : (
        <StyledSpinner />
      )}
      <span ref={myRef} />
      <FormFooter
        d="flex"
        show={show}
        isExpanded={isExpanded}
        blocks={blocks}
        suggestions={suggestions}
      >
        <Avatar name={`${user?.first_name} ${user?.last_name}`} />
        <Spacing m={{ l: "17px", t: "-22px" }}>
          <CommentsForm
            childId={childId}
            inReply={0}
            setBlocks={setBlocks}
            isExpanded={isExpanded}
            collapseEditor={collapseEditor}
            expandEditor={expandEditor}
            shouldUpdate={shouldUpdate}
            increaseShouldUpdate={increaseShouldUpdate}
            onSubmit={postCommentRequest}
            setSuggestions={setSuggestions}
          />
        </Spacing>
      </FormFooter>
    </Spacing>
  );
};

const FormFooter = styled(Box)`
  ${(props) =>
    props.show &&
    `
    transition: 0.5s;
  position: fixed;
  height:${
    props.show && props.isExpanded
      ? (170 + 25 * props.blocks + 35 * props.suggestions).toString()
      : "50"
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
