import { request } from "../../utils/request";

export const fetchUsersRequest = async (id = 0) => {
  return request({
    endpoint: "admin/users" + (id ? "/" + id : ""),
    method: "GET",
  });
};
