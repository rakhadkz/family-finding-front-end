import { request } from "../../utils/request";

export const createResourceRequest = (data) => {
  return request({
    endpoint: "resources",
    method: "POST",
    data,
  });
};

export const fetchResourceRequest = () => {
  return request({
    endpoint: "resources",
    method: "GET",
  });
};

export const deleteResourceRequest = async (resourceId) => {
  return request({
    endpoint: `resources/${resourceId}`,
    method: "DELETE",
  });
};

export const updateResourceRequest = (resourceId) => async (data) => {
  return request({
    endpoint: `resources/${resourceId}`,
    method: "PUT",
    data,
  });
};
