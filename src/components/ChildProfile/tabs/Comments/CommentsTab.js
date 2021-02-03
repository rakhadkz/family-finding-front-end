import React, { useEffect, useState, useRef, useContext } from "react";
import { postCommentRequest } from "../../../../api/comments";
import { fetchComments } from "../../../../context/children/childProvider";
import { Box, Spacing } from "../../../ui/atoms";
import { Comments } from "./Comments";
import { CommentsForm } from "./CommentsForm";
import { useAuth } from "../../../../context/auth/authContext";
import { Avatar } from "../../../ui/molecules/Avatar";
import styled from "styled-components";
import Spinner from "@atlaskit/spinner";
import { ChildContext } from "../../../../pages/ChildProfilePage";

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

export const CommentsTab = ({ refresh }) => {
  const { state, dispatch } = useContext(ChildContext);
  const { comments, id } = state.child;
  const [show, handleShow] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [blocks, setBlocks] = useState(1);
  const [suggestions, setSuggestions] = useState(0);
  const { user } = useAuth();
  const scrollRef = useRef(null);

  const executeScroll = () =>
    scrollRef.current.scrollIntoView({ behavior: "smooth", block: "start" });

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
    if (show) {
      executeScroll();
    }
  }, [isExpanded, blocks]);

  useEffect(() => {
    comments.sort(
      (a, b) =>
        (a.updated_at > a.created_at
          ? new Date(a.updated_at).getTime()
          : new Date(a.created_at).getTime()) -
        (b.updated_at > b.created_at
          ? new Date(b.updated_at).getTime()
          : new Date(b.created_at).getTime())
    );
    if (
      show &&
      comments &&
      comments[comments.length - 1].in_reply_to === null &&
      comments[comments.length - 1].updated_at ===
        comments[comments.length - 1].created_at
    ) {
      executeScroll();
    }
  }, [comments]);

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
          {comments
            .filter((comment) => !comment.in_reply_to)
            .sort(
              (a, b) =>
                new Date(a.created_at).getTime() -
                new Date(b.created_at).getTime()
            )
            .map((comment, index) => (
              <Comments
                childId={id}
                data={comment}
                key={comment.id}
                refresh={refresh}
              />
            ))}
        </Spacing>
      ) : (
        <StyledSpinner />
      )}
      <ScrollDown ref={scrollRef} />
      <FormFooter
        d="flex"
        show={show}
        isExpanded={isExpanded}
        blocks={blocks}
        suggestions={suggestions}
      >
        <Box d="f">
          <Avatar name={`${user?.first_name} ${user?.last_name}`} />
          <Spacing m={{ l: "17px", t: "-31px" }}>
            <CommentsForm
              refresh={refresh}
              childId={id}
              inReply={0}
              setBlocks={setBlocks}
              isExpanded={isExpanded}
              collapseEditor={collapseEditor}
              expandEditor={expandEditor}
              onSubmit={postCommentRequest}
              setSuggestions={setSuggestions}
            />
          </Spacing>
        </Box>
      </FormFooter>
    </Spacing>
  );
};

const ScrollDown = styled.span``;

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
