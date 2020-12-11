import { request } from "../../utils/request";

export const fetchActionItemsRequest = (params) => {
  return request({
    endpoint: "action_items?view=extended&page=" + params.page,
    method: "GET",
    meta: params.meta,
  });
};

export const fetchActionItemsMeta = () => {
  return request({
    endpoint: "action_items",
    method: "GET",
    meta: true,
  });
};
