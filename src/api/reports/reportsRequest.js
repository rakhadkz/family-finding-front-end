import { request } from "../../utils/request";

export const fetchChildrenRequest = ({filter}) => {
  return request({
    endpoint: `admin/reports/children?filter=${filter ? filter : ''}`,
    method: "GET",
    meta: true,
  });
};

export const fetchPlacementsRequest = () => {
  return request({
    endpoint: "admin/reports/placements",
    method: "GET",
    meta: true
  });
};

export const fetchLinkedConnectionsRequest = () => {
    return request({
      endpoint: "admin/reports/linked_connections",
      method: "GET",
      meta: true
    });
  };
