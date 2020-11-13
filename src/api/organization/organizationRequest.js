import { request } from "../../utils/request";

export const fetchOrganizationsRequest = async (view = null) => {
  return request({
    endpoint: "super_admin/organizations?view=" + view,
    method: "GET",
  });
};

export const createOrganizationRequest = async (organization) => {
  console.log("body", organization);
  const organizationBody = {
    name: organization.name,
    address: organization.address,
    phone: organization.phone,
    logo: organization?.logo[0]?.name,
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
