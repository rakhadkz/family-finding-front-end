import { request } from "../../utils/request";

export const postCommentRequest = (data) => {
  return request({
    endpoint: "comments",
    method: "POST",
    data,
  });
};
