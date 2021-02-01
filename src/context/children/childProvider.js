import { toast } from "react-toastify";
import {
  createChildContactRequest,
  fetchContactsRequest,
  removeChildContactRequest,
  updateChildContactRequest,
  updateChildContactRequestConnections,
} from "../../api/childContact";
import {
  createChildRequest,
  fetchChildComments,
  fetchChildrenRequest,
  updateChildRequest,
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

const fetchContacts = (params = null) => {
  const errorStatuses = {
    500: "Error on Server!",
  };

  return fetchContactsRequest(params).catch((err) => {
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

const updateChild = (data) => {
  const errorStatuses = {
    500: "Error on Server !",
  };

  return updateChildRequest(data).catch((err) => {
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

const createChildContact = (data) => {
  console.log("HELLLO", data);
  const errorStatuses = {
    500: "Error on Server !",
  };

  return createChildContactRequest(data).catch((err) => {
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

const updateChildContact = (data, contactId) => {
  console.log("HELLLO", data);
  const errorStatuses = {
    500: "Error on Server !",
  };

  return updateChildContactRequest(data, contactId).catch((err) => {
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

const updateChildContactConnections = (data, contactId) => {
  console.log("HELLLO", data);
  const errorStatuses = {
    500: "Error on Server !",
  };

  return updateChildContactRequestConnections(data, contactId).catch((err) => {
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

const removeChildContact = (contactId) => {
  const errorStatuses = {
    500: "Error on Server !",
  };

  return removeChildContactRequest(contactId).catch((err) => {
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

export {
  fetchChildren,
  createChild,
  updateChild,
  createChildContact,
  updateChildContact,
  updateChildContactConnections,
  removeChildContact,
  fetchContacts,
  fetchComments,
};
