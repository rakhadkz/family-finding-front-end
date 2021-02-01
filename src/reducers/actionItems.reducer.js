export const ACTIONS = {
  FETCH_ACTION_ITEMS_REQUEST: 'fetch_action_items_request',
  FETCH_ACTION_ITEMS_SUCCESS: 'fetch_action_items_success',
  FETCH_ACTION_ITEMS_FAILURE: 'fetch_action_items_failure',
}

export const initialState = {
  loading: true,
  error: '',
  actionItems: []
}

export default function actionItemsReducer(state, action){
  switch(action.type){
    case ACTIONS.FETCH_ACTION_ITEMS_REQUEST:
      return {
        ...state,
        loading: true,
        error: ''
      }
    case ACTIONS.FETCH_ACTION_ITEMS_SUCCESS:
      return {
        actionItems: action.payload,
        loading: false,
        error: ''
      }
    case ACTIONS.FETCH_ACTION_ITEMS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    default: return state
  }
}