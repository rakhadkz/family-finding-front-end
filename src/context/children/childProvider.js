import { toast } from "react-toastify";
import {
  fetchChildrenRequest,
  createChildRequest
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

const fetchComments = (id) => {
  const errorStatuses = {
    500: "Error on Server!",
  };

  return fetchChildComments(id).catch((err) => {
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

const createChild = (data) => {
  console.log("HELLLO", data);
  const errorStatuses = {
    500: "Error on Server !",
  };

  return createChildRequest(data).catch((err) => {
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

export { fetchChildren, fetchComments, createChild };
