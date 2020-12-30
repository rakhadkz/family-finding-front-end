import { request } from "../../utils/request";

export const createAttachmentRequest = (data) => {
  return request({
    endpoint: "attachments",
    data,
    method: "POST",
  });
};

export const createChildAttachmentRequest = (data) => {
  return request({
    endpoint: "child_attachments",
    data,
    method: "POST",
  });
};
