export const ACTIONS = {
  FETCH_CHILDREN_REQUEST: 'fetch_children_request',
  FETCH_CHILDREN_SUCCESS: 'fetch_children_success',
  FETCH_CHILDREN_FAILURE: 'fetch_children_failure',
}

export const initialState = {
  loading: true,
  error: '',
  children: []
}

export default function childrenReducer(state, action){
  switch(action.type){
    case ACTIONS.FETCH_CHILDREN_REQUEST:
      return {
        ...state,
        loading: true,
        error: ''
      }
    case ACTIONS.FETCH_CHILDREN_SUCCESS:
      return {
        children: action.payload,
        loading: false,
        error: ''
      }
    case ACTIONS.FETCH_CHILDREN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    default: return state
  }
}