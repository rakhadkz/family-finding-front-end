import { request } from "../../utils/request";

export const fetchUsersRequest = async () => {
  return request({
    endpoint: "admin/users",
    method: "GET",
  });
};

export const fetchConcreteUserRequest = async (id) => {
  return request({
    endpoint: "admin/users/" + id,
    method: "GET",
  });
};
