import { request } from "../../utils/request";

export const fetchUsersRequest = async (params) => {
  return request({
    endpoint:
      "admin/users" +
      (params.id ? "/" + params.id : "") +
      (params.view ? "?view=" + params.view : "") +
      (params.page ? "&page=" + params.page : "1"),
    method: "GET",
    meta: params.meta || false,
  });
};

export const fetchUsersMeta = async () => {
  return request({
    endpoint: "admin/users",
    method: "GET",
    meta: true,
  });
};

export const deleteUsersRequest = async (userId) => {
  return request({
    endpoint: `admin/users/${userId}`,
    method: "DELETE",
  });
};

export const deleteOrganizationUserRequest = async (id) => {
  return request({
    endpoint: `user_organizations/${id}`,
    method: "DELETE",
  });
};
