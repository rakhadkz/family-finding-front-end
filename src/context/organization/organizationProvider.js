import { toast } from "react-toastify";
import { fetchOrganizationsRequest } from "../../api/organization";

const fetchOrganizations = (view) => {
  const errorStatuses = {
    500: "Error on Server !",
  };

  return fetchOrganizationsRequest(view).catch((err) => {
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

export { fetchOrganizations };
