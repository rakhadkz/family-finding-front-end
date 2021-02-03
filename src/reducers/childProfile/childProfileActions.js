export const FETCH_CHILD_REQUEST = 'FETCH_CHILD_REQUEST'
export const FETCH_CHILD_SUCCESS = 'FETCH_CHILD_SUCCESS'
export const FETCH_CHILD_FAILURE = 'FETCH_CHILD_FAILURE'
export const FETCH_CHILD_USERS_SUCCESS = 'FETCH_CHILD_USERS_SUCCESS'
export const FETCH_CHILD_USERS_FAILURE = 'FETCH_CHILD_USERS_FAILURE'

export const fetchChildRequest = () => {
  return {
    type: FETCH_CHILD_REQUEST
  }
}

export const fetchChildSuccess = data => {
  return {
    type: FETCH_CHILD_SUCCESS,
    payload: data
  }
}

export const fetchChildFailure = error => {
  return {
    type: FETCH_CHILD_FAILURE,
    payload: error
  }
}

export const fetchChildUsersSuccess = ({ child_users, not_child_users }) => {
  return {
    type: FETCH_CHILD_USERS_SUCCESS,
    payload: {
      child_users: child_users.map(({ id, user }) => ({
        email: user.email,
        key: user.id,
        name: `${user.first_name} ${user.last_name}`,
        href: "#",
        id: id
      })),
      not_child_users: not_child_users.map((user) => ({
        label: `${user.first_name} ${user.last_name}`,
        value: user.id,
      }))
    }
  }
}

export const fetchChildUsersFailure = error => {
  return {
    type: FETCH_CHILD_USERS_FAILURE,
    payload: error
  }
}