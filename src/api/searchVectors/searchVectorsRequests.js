import { request } from "../../utils/request";

export const fetchSearchVectorsRequest = (params) => {
  const {
    view = "",
    page = "",
    search = "",
    meta = false,
    organization_id,
  } = params;
  return request({
    endpoint:
      "admin/search_vectors" +
      `?view=${view}&page=${page}&search=${search}&organization_id=${organization_id}`,
    method: "GET",
    meta: meta,
  });
};

export const postSearchVectorRequest = (data) => {
  return request({
    endpoint: "admin/search_vectors",
    method: "POST",
    data: data,
  });
};

export const deleteSearchVectorRequest = (data) => {
  return request({
    endpoint: `admin/search_vectors/${data.id}&organization_id=${data.organization_id}`,
    method: "DELETE",
  });
};

export const updateSearchVectorRequest = (params) => {
  return request({
    endpoint: `admin/search_vectors/${params.id}`,
    method: "PUT",
    data: params.data,
  });
};
