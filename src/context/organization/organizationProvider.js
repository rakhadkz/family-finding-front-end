import { toast } from "react-toastify";
import {
  createOrganizationRequest,
  fetchOrganizationsRequest,
} from "../../api/organization";

const fetchOrganizations = () => {
  const errorStatuses = {
    500: "Error on Server !",
  };

  return fetchOrganizationsRequest("extended").catch((err) => {
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

const createOrganization = (data) => {
  console.log("HELLLO", data);
  const errorStatuses = {
    500: "Error on Server !",
  };

  return createOrganizationRequest(data).catch((err) => {
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

export { fetchOrganizations, createOrganization };
