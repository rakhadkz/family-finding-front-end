import { request } from "../../utils/request";

export const fetchChildrenRequest = (params) => {
  const { view = "", page = "", search = "", meta = false } = params;
  return request({
    endpoint:
      "children" +
      (params.id ? `/${params.id}` : ``) +
      `?view=${view}&page=${page}&search=${search}`,
    method: "GET",
    meta: meta,
  });
};


export const fetchChildrenMeta = () => {
  return request({
    endpoint: "children",
    method: "GET",
    meta: true,
  })
}
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
