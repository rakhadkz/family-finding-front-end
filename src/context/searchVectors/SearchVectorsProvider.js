import { toast } from "react-toastify";
import {
  fetchSearchVectorsRequest,
  postSearchVectorRequest,
  deleteSearchVectorRequest,
} from "../../api/searchVectors";

const fetchSearchVectors = (params = null) => {
  const errorStatuses = {
    500: "Error on Server!",
  };

  return fetchSearchVectorsRequest(params).catch((err) => {
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

const postSearchVector = (params) => {
  const errorStatuses = {
    500: "Error on Server!",
  };

  return postSearchVectorRequest(params).catch((err) => {
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

const deleteSearchVector = (params) => {
  const errorStatuses = {
    500: "Error on Server!",
  };

  return deleteSearchVectorRequest(params).catch((err) => {
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

export { fetchSearchVectors, postSearchVector, deleteSearchVector };
