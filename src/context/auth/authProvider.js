import { toast } from "react-toastify";
import {
  fetchMeRequest,
  loginRequest,
  signupRequest,
  resetRequest,
  newPasswordRequest,
} from "../../api/auth";
import {
  handleUserResponse,
  localStorageKey,
} from "../../utils/requestHandler";

const getToken = async () => {
  return window.localStorage.getItem(localStorageKey);
};

const login = ({ email, password }) => {
  const errorStatuses = {
    500: "Server error!",
    401: "Incorrect email or password!",
  };

  return loginRequest({ email, password })
    .then(handleUserResponse)
    .catch((err) => {
      console.log(err);
      toast.error(errorStatuses[err.status] || "Uncaught error !", {
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

const reset = (data) => {
  const errorStatuses = {
    500: "Error on Server !",
    404: "Incorrect Password!",
  };

  return resetRequest(data)
    .then(() => {
      toast.success("Check your inbox to reset your password!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    })
    .catch((err) => {
      toast.error(errorStatuses[err.status], {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    });
};

const newPassword = (data) => {
  const errorStatuses = {
    500: "Error on Server !",
  };

  return newPasswordRequest(data)
    .then(() => {
      toast.success("Your password has been successfully updated!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    })
    .catch((err) => {
      toast.error(errorStatuses[err.status], {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    });
};

const reset = (data) => {
  const errorStatuses = {
    500: "Error on Server !",
    404: "Incorrect Password!"
  };

  return resetRequest(data)
    .then(()=>{
      toast.success('Check your inbox to reset your password!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    })
    .catch((err) => {
      toast.error(errorStatuses[err.status], {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    });
}

const newPassword = (data) => {
  const errorStatuses = {
    500: "Error on Server !",
  };

  return newPasswordRequest(data).then(()=>{
    toast.success('Your password has been successfully updated!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
  })
    .catch((err) => {
      toast.error(errorStatuses[err.status], {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    });
}

const signup = (user) => {
  const errorStatuses = {
    500: "Error on Server !",
    422: "User already exists !",
  };

  return signupRequest(user).catch((err) => {
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

const fetchMe = () => {
  return fetchMeRequest().then(handleUserResponse).catch(logout);
};

const logout = async () => {
  window.localStorage.removeItem(localStorageKey);
};

export { getToken, login, signup, logout, reset, newPassword, fetchMe };
