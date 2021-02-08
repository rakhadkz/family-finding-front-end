export const FETCH_CHILD_REQUEST = "FETCH_CHILD_REQUEST";
export const FETCH_CHILD_SUCCESS = "FETCH_CHILD_SUCCESS";
export const FETCH_CHILD_FAILURE = "FETCH_CHILD_FAILURE";
export const FETCH_CHILD_USERS_SUCCESS = "FETCH_CHILD_USERS_SUCCESS";
export const FETCH_CHILD_USERS_FAILURE = "FETCH_CHILD_USERS_FAILURE";
export const POST_POTENTIAL_MATCH = "POST_POTENTIAL_MATCH";
export const FETCH_CONNECTIONS_SUCCESS = "FETCH_CONNECTIONS_SUCCESS";
export const FETCH_CONNECTIONS_FAILURE = "FETCH_CONNECTIONS_FAILURE";
export const FETCH_FAMILY_TREE_SUCCESS = "FETCH_FAMILY_TREE_SUCCESS";
export const FETCH_FAMILY_TREE_FAILURE = "FETCH_FAMILY_TREE_FAILURE";

export const fetchChildRequest = () => {
  return {
    type: FETCH_CHILD_REQUEST,
  };
};

export const postPotentialMatch = (index) => {
  return {
    type: POST_POTENTIAL_MATCH,
    payload: index,
  };
};

export const fetchChildSuccess = (data) => {
  return {
    type: FETCH_CHILD_SUCCESS,
    payload: data,
  };
};

export const fetchChildFailure = (error) => {
  return {
    type: FETCH_CHILD_FAILURE,
    payload: error,
  };
};

export const fetchChildUsersSuccess = ({ child_users, not_child_users }) => {
  return {
    type: FETCH_CHILD_USERS_SUCCESS,
    payload: {
      child_users: child_users.map(({ id, user }) => ({
        email: user.email,
        key: user.id,
        name: `${user.first_name} ${user.last_name}`,
        href: "#",
        id: id,
        src: `https://ui-avatars.com/api/?background=c1c7d0&color=fff&name=${user.first_name}+${user.last_name}`
      })),
      not_child_users: not_child_users.map((user) => ({
        label: `${user.first_name} ${user.last_name}`,
        value: user.id,
      })),
    },
  };
};

export const fetchChildUsersFailure = (error) => {
  return {
    type: FETCH_CHILD_USERS_FAILURE,
    payload: error,
  };
};

export const fetchConnectionsSuccess = data => {
  return {
    type: FETCH_CONNECTIONS_SUCCESS,
    payload: data
  }
}

export const fetchConnectionsFailure = error => {
  return {
    type: FETCH_CONNECTIONS_FAILURE,
    payload: error
  }
}

export const fetchFamilyTreeSuccess = data => {
  return {
    type: FETCH_FAMILY_TREE_SUCCESS,
    payload: data
  }
}

export const fetchFamilyTreeFailure = error => {
  return {
    type: FETCH_FAMILY_TREE_FAILURE,
    payload: error
  }
}
