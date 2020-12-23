import { request } from "../../utils/request";

export const fetchChildrenRequest = (params) => {
  const { view = "", page = "", search = "", meta = false } = params;
  return request({
    endpoint:
      "children" +
      (params.id ? `/${params.id}` : ``) +
      `?view=${view}&page=${page}&search=${search}`,
    method: "GET",
    meta: meta,
  });
};

export const fetchChildUsersRequest = (params) => {
  return request({
    endpoint:
      "children" +
      (params.id ? `/${params.id}` : ``) + `?view=users`,
    method: "GET",
  })
}

export const fetchChildrenMeta = () => {
  return request({
    endpoint: "children",
    method: "GET",
    meta: true,
  })
}

export const fetchChildComments = (id) => {
  return request({
    endpoint: `children/${id}?view=comments`,
    method: "GET",
  });
};

export const fetchChildAttachmentsRequest = (id) => {
  return request({
    endpoint: `children/${id}?view=attachments`,
    method: "GET",
  });
};

export const createChildRequest = (data) => {
  return request({
    endpoint: "children",
    method: "POST",
    data,
  });
};

export const createChildUserRequest = (data) => {
  return request({
    endpoint: "user_children",
    method: "POST",
    data,
  })
}

export const approveChildUserRequest = (user_id, child_id) => {
  return request({
    endpoint: "user_children",
    method: "PUT",
    data: {
      "user_child": {
        "user_id": user_id,
        "child_id": child_id,
        "date_approved": new Date()
      }
    }
  })
}

export const denyChildUserRequest = (user_id, child_id) => {
  return request({
    endpoint: "user_children",
    method: "PUT",
    data: {
      "user_child": {
        "user_id": user_id,
        "child_id": child_id,
        "date_denied": new Date()
      }
    }
  })
}