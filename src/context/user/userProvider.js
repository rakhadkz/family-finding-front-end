import { fetchUsersRequest } from "../../api/user";
import { localStorageKey } from "../../utils/requestHandler";
import { toast } from "react-toastify";

const getToken = async () => {
  return window.localStorage.getItem(localStorageKey);
};

const fetchUsers = (id = 0) => {
  const errorStatuses = {
    500: "Error on Server !",
  };

  return fetchUsersRequest(id).catch((err) => {
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

export { fetchUsers };
