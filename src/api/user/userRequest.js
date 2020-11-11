import { request } from "../../utils/request";

export const fetchUsersRequest = async () => {
  return request({
    endpoint: "admin/users",
    method: "GET",
  });
};
