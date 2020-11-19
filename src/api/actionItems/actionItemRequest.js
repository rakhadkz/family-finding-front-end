import { request } from "../../utils/request";

export const fetchActionItemsRequest = () => {
  return request({
    endpoint: "action_items?view=extended",
    method: "GET",
  });
};
