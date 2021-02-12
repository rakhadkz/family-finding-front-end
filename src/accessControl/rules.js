import {
  ACTION_ITEMS,
  ATTACHMENTS,
  CHILDREN,
  COMMUNICATION_TEMPLATES,
  ORGANIZATIONS,
  ORGANIZATION_USERS,
  REPORTS,
  SEARCHVECTOR,
  SETTINGS,
  USERS,
  RESOURCES,
} from "../helpers";
import { ACTIONS } from "./actions";

const rules = {
  user: {
    static: [
      `${ACTION_ITEMS}:${ACTIONS.VISIT}`,
      `${CHILDREN}:${ACTIONS.VISIT}`,
      `${CHILDREN}:${ACTIONS.VISIT_ONE}`,
      `${SETTINGS}:${ACTIONS.VISIT}`,
      `${ORGANIZATION_USERS}:${ACTIONS.VISIT}`,
      `${ORGANIZATION_USERS}:${ACTIONS.VISIT_ONE}`,
      `${RESOURCES}:${ACTIONS.VISIT}`,
    ],
    dynamic: {
      "attachments:REMOVE": ({ userId, authorId }) => {
        if (!userId || !authorId) return false;
        return userId === authorId;
      },
    },
  },
  manager: {
    static: [
      `${ORGANIZATION_USERS}:${ACTIONS.VISIT}`,
      `${ORGANIZATION_USERS}:${ACTIONS.VISIT_ONE}`,
      `${ATTACHMENTS}:${ACTIONS.REMOVE}`,
      `${ACTION_ITEMS}:${ACTIONS.VISIT}`,
      `${CHILDREN}:${ACTIONS.ADD}`,
      `${CHILDREN}:${ACTIONS.VISIT}`,
      `${CHILDREN}:${ACTIONS.EDIT}`,
      `${CHILDREN}:${ACTIONS.VISIT_ONE}`,
      `${CHILDREN}:${ACTIONS.ASSIGN_USER}`,
      `${CHILDREN}:${ACTIONS.REMOVE_ASSIGNED_USER}`,
      `${CHILDREN}:${ACTIONS.SET_REMINDER}`,
      `${SEARCHVECTOR}:${ACTIONS.VISIT}`,
      `${SETTINGS}:${ACTIONS.VISIT}`,
      `${COMMUNICATION_TEMPLATES}:${ACTIONS.VISIT}`,
      `${REPORTS}:${ACTIONS.VISIT}`,
      `${RESOURCES}:${ACTIONS.VISIT}`,
    ],
  },
  admin: {
    static: [
      `${ORGANIZATION_USERS}:${ACTIONS.VISIT}`,
      `${ORGANIZATION_USERS}:${ACTIONS.VISIT_ONE}`,
      `${ATTACHMENTS}:${ACTIONS.REMOVE}`,
      `${ACTION_ITEMS}:${ACTIONS.VISIT}`,
      `${CHILDREN}:${ACTIONS.ADD}`,
      `${CHILDREN}:${ACTIONS.VISIT}`,
      `${CHILDREN}:${ACTIONS.EDIT}`,
      `${CHILDREN}:${ACTIONS.VISIT_ONE}`,
      `${CHILDREN}:${ACTIONS.ASSIGN_USER}`,
      `${CHILDREN}:${ACTIONS.REMOVE_ASSIGNED_USER}`,
      `${CHILDREN}:${ACTIONS.SET_REMINDER}`,
      `${SEARCHVECTOR}:${ACTIONS.VISIT}`,
      `${SEARCHVECTOR}:${ACTIONS.EDIT}`,
      `${SETTINGS}:${ACTIONS.VISIT}`,
      `${COMMUNICATION_TEMPLATES}:${ACTIONS.VISIT}`,
      `${COMMUNICATION_TEMPLATES}:${ACTIONS.ADD}`,
      `${COMMUNICATION_TEMPLATES}:${ACTIONS.EDIT}`,
      `${REPORTS}:${ACTIONS.VISIT}`,
      `${USERS}:${ACTIONS.ADD}`,
      `${USERS}:${ACTIONS.REMOVE}`,
      `${RESOURCES}:${ACTIONS.VISIT}`,
    ],
  },
  super_admin: {
    static: [
      `${USERS}:${ACTIONS.VISIT}`,
      `${USERS}:${ACTIONS.VISIT_ONE}`,
      `${USERS}:${ACTIONS.ADD}`,
      `${USERS}:${ACTIONS.REMOVE}`,
      `${ORGANIZATIONS}:${ACTIONS.VISIT}`,
      `${ORGANIZATIONS}:${ACTIONS.VISIT_ONE}`,
      `${ORGANIZATIONS}:${ACTIONS.ADD}`,
      `${SEARCHVECTOR}:${ACTIONS.VISIT}`,
      `${SEARCHVECTOR}:${ACTIONS.EDIT}`,
      `${COMMUNICATION_TEMPLATES}:${ACTIONS.VISIT}`,
      `${COMMUNICATION_TEMPLATES}:${ACTIONS.EDIT}`,
      `${COMMUNICATION_TEMPLATES}:${ACTIONS.ADD}`,
    ],
  },
};

export default rules;
