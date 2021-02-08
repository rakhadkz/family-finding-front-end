import { constructTree } from "../../content/childContact.tree.data";
import {
  FETCH_CHILD_FAILURE,
  FETCH_CHILD_REQUEST,
  FETCH_CHILD_SUCCESS,
  FETCH_CHILD_USERS_FAILURE,
  FETCH_CHILD_USERS_SUCCESS,
  FETCH_CONNECTIONS_FAILURE,
  FETCH_CONNECTIONS_SUCCESS,
  FETCH_FAMILY_TREE_FAILURE,
  FETCH_FAMILY_TREE_SUCCESS,
  POST_POTENTIAL_MATCH,
} from "./childProfileActions";

export const initialState = {
  loading: true,
  error: "",
  child: {},
  child_users: [],
  not_child_users: [],
  connections: [],
  family_tree: [],
  constructedTree: [],
  hasAccess: true,
};

export const childProfileReducer = (state, action) => {
  switch (action.type) {
    case FETCH_CHILD_REQUEST:
      return {
        ...state,
        loading: true,
        error: "",
        hasAccess: false,
      };
    case FETCH_CHILD_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
        child: action.payload,
        hasAccess: action.payload.id !== null,
      };
    case FETCH_CHILD_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        child: {},
        hasAccess: false,
      };
    case FETCH_CHILD_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
        child_users: action.payload.child_users,
        not_child_users: action.payload.not_child_users,
      };
    case FETCH_CHILD_USERS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        child_users: [],
        not_child_users: [],
      };
    case POST_POTENTIAL_MATCH:
      state.child.contacts[action.payload].potential_match = !state.child
        .contacts[action.payload].potential_match;
      return {
        ...state,
        loading: false,
        error: action.payload,
        child: state.child,
      };
    case FETCH_CONNECTIONS_SUCCESS:
      return {
        ...state,
        connections: action.payload
      }
    case FETCH_CONNECTIONS_FAILURE:
      return {
        ...state,
        connections: [],
        error: action.payload
      }
    case FETCH_FAMILY_TREE_SUCCESS:
      return {
        ...state,
        family_tree: action.payload,
        constructedTree: constructTree({contacts: action.payload, firstName: state.child.first_name, lastName: state.child.last_name})
      }
    case FETCH_FAMILY_TREE_FAILURE:
      return {
        ...state,
        family_tree: [],
        constructedTree: [],
        error: action.payload
      }
    default:
      return state;
  }
};
