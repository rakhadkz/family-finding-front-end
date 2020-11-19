import { toast } from "react-toastify";
import { fetchChildrenRequest } from "../../api/children";

const fetchChildren = (view = "") => {
  const errorStatuses = {
    500: "Error on Server!",
  };

  return fetchChildrenRequest(view).catch((err) => {
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

export { fetchChildren };
