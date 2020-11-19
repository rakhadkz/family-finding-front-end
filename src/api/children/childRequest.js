import { request } from "../../utils/request";

export const fetchChildrenRequest = (view = "") => {
  return request({
    endpoint: "children?view=" + view,
    method: "GET",
  });
};
