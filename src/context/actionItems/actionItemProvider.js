import { toast } from "react-toastify";
import { fetchActionItemsRequest } from "../../api/actionItems";

const fetchActionItems = () => {
  const errorStatuses = {
    500: "Error on Server!",
  };

  return fetchActionItemsRequest().catch((err) => {
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

export { fetchActionItems };
