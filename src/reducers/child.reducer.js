export const ACTIONS = {
  FETCH_CHILD_REQUEST: "fetch_child_request",
  FETCH_CHILD_SUCCESS: "fetch_child_success",
  FETCH_CHILD_FAILURE: "fetch_child_failure",
  FETCH_CHILD_USERS_SUCCESS: "fetch_child_users_success",
  FETCH_CHILD_USERS_FAILURE: "fetch_child_users_failure",
};

export const initialState = {
  loading: true,
  error: "",
  child: {},
  child_users: [],
  not_child_users: [],
  hasAccess: true,
};

export default function childReducer(state, action) {
  switch (action.type) {
    case ACTIONS.FETCH_CHILD_REQUEST:
      return {
        ...state,
        loading: true,
        error: "",
        hasAccess: false,
      };
    case ACTIONS.FETCH_CHILD_SUCCESS:
      console.log(action.payload.id);
      return {
        ...state,
        loading: false,
        error: "",
        child: action.payload,
        hasAccess: action.payload.id !== null,
      };
    case ACTIONS.FETCH_CHILD_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        child: {},
        hasAccess: false,
      };
    case ACTIONS.FETCH_CHILD_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
        child_users: action.payload.child_users.map(({ id, user }) => ({
          email: user.email,
          key: user.id,
          name: `${user.first_name} ${user.last_name}`,
          href: "#",
          id: id,
        })),
        not_child_users: action.payload.not_child_users.map((user) => ({
          label: `${user.first_name} ${user.last_name}`,
          value: user.id,
        })),
      };
    case ACTIONS.FETCH_CHILD_USERS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        child_users: [],
        not_child_users: [],
      };
    case ACTIONS.POST_POTENTIAL_MATCH:
      state.child.contacts[action.payload].potential_match = !state.child
        .contacts[action.payload].potential_match;
      return {
        ...state,
        loading: false,
        error: action.payload,
        child: state.child,
      };
    default:
      return state;
  }
}
