import { request } from "../../utils/request";

export const fetchChildrenRequest = (params) => {
  return request({
    endpoint:
      "children" +
      (params.id ? `/${params.id}` : ``) +
      (params.view ? `?view=${params.view}` : ``) +
      (params.page ? `&page=${params.page}` : ``),
    method: "GET",
    meta: params.meta || false,
  });
};

export const fetchChildrenMeta = () => {
  return request({
    endpoint: "children",
    method: "GET",
    meta: true,
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
