import { toast } from "react-toastify";
import {
  fetchSearchVectorsRequest,
  postSearchVectorRequest,
  deleteSearchVectorRequest,
  updateSearchVectorRequest,
} from "../../api/searchVectors";

const fetchSearchVectors = (params = null) => {
  const errorStatuses = {
    500: "Error on Server!",
  };

  return fetchSearchVectorsRequest(params).catch((err) =>
    toast.error(errorStatuses[err.status])
  );
};

const postSearchVector = (params) => {
  const errorStatuses = {
    500: "Error on Server!",
  };

  return postSearchVectorRequest(params).catch((err) =>
    toast.error(errorStatuses[err.status])
  );
};

const deleteSearchVector = (params) => {
  const errorStatuses = {
    500: "Error on Server!",
  };

  return deleteSearchVectorRequest(params).catch((err) =>
    toast.error(errorStatuses[err.status])
  );
};

const updateSearchVector = (params) => {
  const errorStatuses = {
    500: "Error on Server!",
  };

  return updateSearchVectorRequest(params).catch((err) =>
    toast.error(errorStatuses[err.status])
  );
};

export {
  fetchSearchVectors,
  postSearchVector,
  deleteSearchVector,
  updateSearchVector,
};
