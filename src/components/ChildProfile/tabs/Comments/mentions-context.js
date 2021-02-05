import React, { useEffect, useState, useContext } from "react";
import { fetchUsersRequest } from "../../../../api/user";
import { getLocalStorageUser } from "../../../../context/auth/authProvider";
import { ChildContext } from "../../../../pages/ChildProfilePage";

export const MentionsContext = React.createContext();

export const MentionsProvider = (props) => {
  const localStorageUser = getLocalStorageUser();
  const [mentions, setMentions] = useState();
  const { state, dispatch } = useContext(ChildContext);
  const [contacts, setContacts] = useState(
    state.child.contacts
      .map((s) => s?.contact)
      .map((contact) => ({
        name: `${
          contact?.first_name[0]?.toUpperCase() +
          contact?.first_name?.substring(1)
        } ${
          contact.last_name
            ? contact?.last_name[0]?.toUpperCase() +
              contact?.last_name?.substring(1)
            : ""
        }`,
        // title: "Staff of Penn State Orphanage",
        id: contact?.id,
      }))
  );

  useEffect(() => {
    fetchUsersRequest().then((response) => {
      console.log(response);
      setMentions(
        response.map((user) => ({
          name: `${
            user.first_name[0].toUpperCase() + user.first_name.substring(1)
          } ${user.last_name[0].toUpperCase() + user.last_name.substring(1)}`,
          // title: "Staff of Penn State Orphanage",
          id: user.id,
        }))
      );
    });
  }, []);

  const value = React.useMemo(
    () => ({
      mentions,
      contacts,
    }),
    [mentions, contacts]
  );

  return <MentionsContext.Provider value={value} {...props} />;
};

export const useMentions = () => {
  const context = React.useContext(MentionsContext);
  if (context === undefined) {
    return { mentions: [], contacts: [] };
  }
  return context;
};
