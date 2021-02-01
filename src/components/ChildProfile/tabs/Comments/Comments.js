import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { Box, Spacing, Title } from "../../../ui/atoms";
import Button, { ButtonGroup } from "@atlaskit/button";
import { CommentsForm } from "./CommentsForm";
import { useClickOutside } from "../../../../hooks/index";
import {
  postCommentRequest,
  updateCommentRequest,
  deleteCommentRequest,
} from "../../../../api/comments";
import { Avatar } from "../../../ui/molecules/Avatar";
import { useAuth } from "../../../../context/auth/authContext";
import { ModalDialog } from "../../../ui/common";
import moment from "moment";

export const Comments = ({
  data,
  shouldUpdate,
  increaseShouldUpdate,
  childId,
  fetch,
}) => {
  const [showInput, setShowInput] = useState(false);
  const [commentData, setCommentData] = useState(
    data.html_body ? data.html_body : data.body
  );
  const [body, setBody] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [edit, setEdit] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [initialValue, setInitialValue] = useState("");
  const { user } = useAuth();
  const expandEditor = () => setIsExpanded(true);
  const collapseEditor = () => {
    setShowInput(false) && setIsExpanded(false);
  };

  // console.log(data);
  useEffect(() => {
    let comment = commentData;
    let ij = [];
    for (let i = 0; i < comment.length; i++) {
      if (
        (i === 0 && comment[i] === "@") ||
        (comment[i] === "@" && comment[i - 1] === " ") ||
        (comment[i] === "@" && comment[i - 1] === ">")
      ) {
        let j,
          s = 0;
        for (j = 1; j + i < comment.length && s !== 2; j++) {
          // find last index of mention
          if (comment[i + j] === " " || comment[i + j + 1] === "&") s++;
        }
        ij.push([i, i + j]);
      }
    }
    let res = [];
    let last = 0;
    if (ij.length > 0) {
      for (let i = 0; i < ij.length; i++) {
        // for mention highlight
        res.push(comment.substring(last, ij[i][0]));
        res.push(`<a style="
        cursor:pointer;
        color:#0052CC;
        text-decoration:none;
        font:14px Helvetica;
        a:hover {text-decoration:underline;};
        ">
          ${comment.substring(ij[i][0], ij[i][1])}
        </a>`);
        last = ij[i][1];
      }
      let end = comment.substring(last);
      comment = "";
      res.forEach((item) => (comment += item));
      comment += end;
    }
    // console.log(comment);
    setBody(comment);
  }, [edit]);

  const onDelete = () => {
    deleteCommentRequest({ commentId: data.id })
      .then((res) => {
        // console.log(res);
      })
      .finally(() => {
        setModalOpen(false);
        fetch();
      });
  };

  const time = () => {
    let duration = moment(data.created_at).fromNow();
    if (
      moment().subtract(31, "days").valueOf() >
      moment(data.created_at).valueOf()
    ) {
      return `on ${moment(data.created_at).format("ll")}`;
    } else {
      return duration;
    }
  };

  return (
    <Spacing m={{ t: "17px" }}>
      <Box d="flex">
        <Avatar name={`${data.user.first_name} ${data.user.last_name}`} />
        <Spacing m={{ l: "7px" }}>
          <Box d="flex">
            <Title
              size="14px"
              style={{ marginRight: "5px" }}
            >{`${data.user.first_name} ${data.user.last_name}`}</Title>
            <Text
              style={{ color: "#586069", lineHeight: "24px" }}
              size="14px"
            >{`commented ${time()}`}</Text>
          </Box>
          {edit ? (
            <Spacing m={{ t: "-22px", l: "17px" }}>
              <CommentsForm
                shouldUpdate={shouldUpdate}
                increaseShouldUpdate={increaseShouldUpdate}
                childid={childId}
                inReply={data.in_reply_to?.id}
                onSubmit={updateCommentRequest}
                setShowInput={setShowInput}
                isExpanded={isExpanded}
                collapseEditor={collapseEditor}
                expandEditor={expandEditor}
                initialValue={initialValue}
                setEdit={setEdit}
                userId={data.user.id}
                commentId={data.id}
                key={data.id}
                setCommentData={setCommentData}
                edit={edit}
              />
            </Spacing>
          ) : (
            <>
              <Text dangerouslySetInnerHTML={{ __html: body }}></Text>
              {showInput ? (
                <>
                  <Spacing m={{ t: "17px" }}>
                    <Box d="flex">
                      <Avatar
                        name={`${data.user.first_name} ${data.user.last_name}`}
                      />
                      <Spacing m={{ t: "-22px", l: "17px" }}>
                        <CommentsForm
                          shouldUpdate={shouldUpdate}
                          increaseShouldUpdate={increaseShouldUpdate}
                          childId={childId}
                          inReply={data.id}
                          onSubmit={postCommentRequest}
                          setShowInput={setShowInput}
                          isExpanded={isExpanded}
                          collapseEditor={collapseEditor}
                          expandEditor={expandEditor}
                          initialValue={initialValue}
                          key={data.id}
                          setEdit={setEdit}
                        />
                      </Spacing>
                    </Box>
                  </Spacing>
                </>
              ) : (
                <ButtonGroup>
                  <Button
                    appearance="link"
                    onClick={() => {
                      setShowInput(true);
                    }}
                    style={{ padding: "0px" }}
                  >
                    <ButtonContentWrapper>Reply</ButtonContentWrapper>
                  </Button>{" "}
                  <Button
                    appearance="link"
                    onClick={() => {
                      setEdit(true);
                      setInitialValue(body);
                      setIsExpanded(true);
                    }}
                    style={{ padding: "0px" }}
                    isDisabled={data.user.id !== user.id}
                  >
                    <ButtonContentWrapper>Edit</ButtonContentWrapper>
                  </Button>{" "}
                  <Button
                    appearance="link"
                    onClick={() => {
                      setModalOpen(true);
                    }}
                    style={{ padding: "0px" }}
                    isDisabled={data.user.id !== user.id}
                  >
                    <ButtonContentWrapper>Delete</ButtonContentWrapper>
                  </Button>
                </ButtonGroup>
              )}
            </>
          )}

          {data.replies.map((reply) => (
            <Comments
              childId={childId}
              fetch={fetch}
              key={data.id}
              data={reply}
              shouldUpdate={shouldUpdate}
              increaseShouldUpdate={increaseShouldUpdate}
            />
          ))}

          <ModalDialog
            isOpen={modalOpen}
            setIsOpen={setModalOpen}
            onClick={onDelete}
            positiveLabel="Delete"
            heading="Are you sure you want to remove this comment?"
            body="You will no longer have access to this comment's content"
            appearance="danger"
          />
        </Spacing>
      </Box>
    </Spacing>
  );
};

const ButtonContentWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-family: Helvetica;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
`;

const Text = styled.div`
  font-family: Helvetica;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  color: #172b4d;
`;
