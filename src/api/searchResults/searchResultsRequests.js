import { request } from "../../utils/request";

export const createSearchResultRequest = (data) => {
  return request({
    endpoint: "family_searches",
    method: "POST",
    data: {
      family_search: {
        ...data,
      },
    },
  });
};

export const createSearchResultConnectionRequest = (
  family_search_id,
  child_contact_id
) => {
  return request({
    endpoint: "family_search_connections",
    method: "POST",
    data: {
      family_search_connection: {
        family_search_id: family_search_id,
        child_contact_id: child_contact_id,
      },
    },
  });
};

export const createSearchResultAttachmentRequest = (
  family_search_id,
  attachment_id
) => {
  return request({
    endpoint: "family_search_attachments",
    method: "POST",
    data: {
      family_search_connection: {
        family_search_id: family_search_id,
        attachment_id: attachment_id,
      },
    },
  });
};
