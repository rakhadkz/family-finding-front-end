export const ACTIONS = {
  FETCH_ORGANIZATION_REQUEST: 'fetch_organization_request',
  FETCH_ORGANIZATION_SUCCESS: 'fetch_organization_success',
  FETCH_ORGANIZATION_FAILURE: 'fetch_organization_failure'
}

export const initialState = {
  loading: true,
  error: '',
  organizations: [],
}

export default function organizationReducer(state, action){
  switch(action.type){
    case ACTIONS.FETCH_ORGANIZATION_REQUEST:
      return {
        ...state,
        loading: true,
        error: ''
      }
    case ACTIONS.FETCH_ORGANIZATION_SUCCESS:
      return {
        organizations: action.payload,
        loading: false,
        error: ''
      }
    case ACTIONS.FETCH_ORGANIZATION_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    default: return state
  }
}