import { toast } from "react-toastify";
import {
  fetchChildAttachmentsRequest,
  fetchChildrenRequest,
} from "../../api/children";

const fetchChildren = (params = null) => {
  const errorStatuses = {
    500: "Error on Server!",
  };

  return fetchChildrenRequest(params).catch((err) => {
    toast.error(errorStatuses[err.status], {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  });
};

const fetchChildAttachments = (id) => {
  const errorStatuses = {
    500: "Error on Server!",
  };

  return fetchChildAttachmentsRequest(id).catch((err) => {
    toast.error(errorStatuses[err.status], {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  });
};

export { fetchChildren, fetchChildAttachments };
