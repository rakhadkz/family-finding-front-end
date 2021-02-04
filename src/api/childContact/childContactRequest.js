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

export const updateChildContactRequest = ({id, ...rest}) => {
  
}

export const createTableChildContactRequest = (data) => {
  return request({
    endpoint: "child_contacts",
    data,
    method: "POST",
  });
};

export const updateContactChildRequest = ({id, ...rest}) => {
  return request({
    endpoint: `child_contacts/${id}`,
    method: "PUT",
    data: {
      child_contact: {
        ...rest
      }
    }
  });
};

export const updateChildContactRequestConnections = (data, contactId) => {
  return request({
    endpoint: `child_contacts/${contactId}`,
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