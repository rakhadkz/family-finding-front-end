import { request } from "../../utils/request";

export const fetchChildrenRequest = (view = "") => {
  return request({
    endpoint: "children?view=" + view,
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
