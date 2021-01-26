import { request } from "../../utils/request";

export const postCommentRequest = (data) => {
  return request({
    endpoint: "comments",
    method: "POST",
    data,
  });
};

export const updateCommentRequest = ({ comment, commentId }) => {
  const data = { comment: comment };
  console.log(JSON.stringify(data));
  console.log(data, `comments/${commentId}`);
  return request({
    endpoint: `comments/${commentId}`,
    method: "PUT",
    data,
  });
};

export const deleteCommentRequest = ({ commentId }) => {
  return request({
    endpoint: `comments/${commentId}`,
    method: "DELETE",
  });
};
