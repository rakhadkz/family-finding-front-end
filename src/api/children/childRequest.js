import { request } from "../../utils/request";

export const fetchChildrenRequest = (view = "") => {
  return request({
    endpoint: "children?view=" + view,
    method: "GET",
  });
};

export const fetchChildComments = (id) => {
  return request({
    endpoint: `children/${id}?view=comments`,
    method: "GET",
  });
};
