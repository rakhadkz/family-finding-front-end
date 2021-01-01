import { request } from "../../utils/request";

export const fetchContactsRequest = () => {
  return request({
    endpoint: "contacts",
    method: "GET",
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
