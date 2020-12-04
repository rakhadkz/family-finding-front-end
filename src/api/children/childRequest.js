import { request } from "../../utils/request";

export const fetchChildrenRequest = (params) => {
  return request({
    endpoint:
      "children" +
      (params.id ? `/${params.id}` : ``) +
      (params.view ? `?view=${params.view}` : ``),
    method: "GET",
  });
};

export const fetchChildComments = (id) => {
  return request({
    endpoint: `children/${id}?view=comments`,
    method: "GET",
  });
};
export const fetchChildAttachmentsRequest = (id) => {
  return request({
    endpoint: `children/${id}?view=attachments`,
    method: "GET",
  });
};

export const createChildRequest = (data) => {
  return request({
    endpoint: "children",
    method: "POST",
    data,
  });
};
