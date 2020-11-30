import { request } from "../../utils/request";

export const fetchOrganizationsRequest = async (params) => {
  return request({
    endpoint:
      "super_admin/organizations" +
      (params.id ? "/" + params.id : "") +
      (params.view ? "?view=" + params.view : ""),
    method: "GET",
  });
};

export const createOrganizationRequest = async (organization) => {
  console.log("body", organization);
  const organizationBody = {
    name: organization.name,
    address: organization.address,
    phone: organization.phone,
    logo: organization.logo,
    website: organization.first_name,
    city: organization?.city,
    zip: organization?.zip,
    state: organization?.state?.value,
  };
  return request({
    endpoint: "super_admin/organizations",
    data: { organization: organizationBody },
    method: "POST",
  });
};
