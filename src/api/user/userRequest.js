import { request } from "../../utils/request";

export const fetchUsersRequest = async (params) => {
  return request({
    endpoint:
      "admin/users" +
      (params.id ? "/" + params.id : "") +
      (params.view ? "?view=" + params.view : ""),
    method: "GET",
  });
};

export const deleteUsersRequest = async (userId) => {
  return request({
    endpoint: `admin/users/${userId}`,
    method: "DELETE",
  });
};
