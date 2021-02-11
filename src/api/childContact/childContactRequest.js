import { request } from "../../utils/request";

export const fetchContactsRequest = () => {
  return request({
    endpoint: "contacts",
    method: "GET",
  });
};

export const fetchConnectionsRequest = (params) => {
  const { view = "", page = "", search = "", meta = false } = params;
  return request({
    endpoint:
      "child_contacts" +
      (params.id ? `/${params.id}` : ``) +
      `?view=${view}&page=${page}&search=${search}`,
    method: "GET",
    meta: meta,
  });
};

export const createChildContactRequest = (data) => {
  return request({
    endpoint: "child_tree_contacts",
    data,
    method: "POST",
  });
};

export const createTableChildContactRequest = (data) => {
  return request({
    endpoint: "child_contacts",
    data,
    method: "POST",
  });
};

export const updateChildContactRequest = (data, contactId) => {
  return request({
    endpoint: `child_tree_contacts/${contactId}`,
    data,
    method: "PUT",
  });
};

export const updateChildContactRequestConnections = (data, contactId) => {
  return request({
    endpoint: `child_contacts/${contactId}`,
    data,
    method: "PUT",
  });
};

export const updateConnectionRequest = (id, data) => {
  return request({
    endpoint: `child_contacts/${id}`,
    method: "PUT",
    data: {
      child_contact: {
        ...data
      }
    }
  });
};

export const updateFamilyTreeRequest = (id, data) => {
  return request({
    endpoint: `child_tree_contacts/${id}`,
    method: "PUT",
    data: {
      child_tree_contact: {
        ...data
      }
    }
  });
}

export const removeChildContactRequest = (contactId) => {
  return request({
    endpoint: `child_tree_contacts/${contactId}`,
    method: "DELETE",
  });
};

export const createContactRequest = (data) => {
  return request({
    endpoint: "contacts",
    data,
    method: "POST",
  });
};

export const updateContactRequest = ({id, ...rest}) => {
  return request({
    endpoint: `contacts/${id}`,
    method: 'PUT',
    data: {
      contact: {
        ...rest
      }
    }
  })
}
