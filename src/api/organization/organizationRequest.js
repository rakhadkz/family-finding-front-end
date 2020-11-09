import { request } from "../../utils/request";

export const fetchOrganizationsRequest = async (view = null) => {
  return request({
    endpoint: "super_admin/organizations?view=" + view,
    method: "GET",
  });
};
