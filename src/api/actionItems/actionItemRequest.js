import { request } from "../../utils/request";

export const fetchActionItemsRequest = () => {
  return request({
    endpoint: "action_items?view=extended",
    method: "GET",
  });
};

export const fetchActionItemsMeta = () => {
  return request({
    endpoint: "action_items",
    method: "GET",
    meta: true,
  });
};
