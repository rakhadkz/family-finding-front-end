export const ACTIONS = {
  FETCH_USERS_REQUEST: 'fetch_users_request',
  FETCH_USERS_SUCCESS: 'fetch_users_success',
  FETCH_USERS_FAILURE: 'fetch_users_failure',
}

export const initialState = {
  loading: true,
  error: '',
  users: [],
}

export default function userReducer(state, action) {
  switch(action.type){
    case ACTIONS.FETCH_USERS_REQUEST:
      return {
        ...state,
        loading: true,
        error: ''
      }
    case ACTIONS.FETCH_USERS_SUCCESS:
      return {
        loading: false,
        error: '',
        users: action.payload
      }
    case ACTIONS.FETCH_USERS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    default: return state
  }
}