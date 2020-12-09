import { toast } from "react-toastify";
import { deleteUsersRequest, fetchUsersRequest } from "../../api/user";
import { localStorageKey } from "../../utils/requestHandler";

const getToken = async () => {
  return window.localStorage.getItem(localStorageKey);
};

const fetchUsers = (params) => {
  const errorStatuses = {
    500: "Error on Server !",
  };

  return fetchUsersRequest(params).catch((err) => {
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

const deleteUser = (userId) => {
  const errorStatuses = {
    500: "Error on Server !",
  };

  return deleteUsersRequest(userId).catch((err) => {
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

export { fetchUsers, deleteUser };
