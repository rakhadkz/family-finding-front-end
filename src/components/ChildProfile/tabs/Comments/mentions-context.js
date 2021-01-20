import React, { useEffect, useState } from "react";
import { fetchUsersRequest } from "../../../../api/user";
import { getLocalStorageUser } from "../../../../context/auth/authProvider";

export const MentionsContext = React.createContext();

export const MentionsProvider = (props) => {
  const localStorageUser = getLocalStorageUser();
  const [mentions, setMentions] = useState();

  useEffect(() => {
    fetchUsersRequest().then((response) => {
      console.log(response);
      setMentions(
        response.map((user) => ({
          name: `${user.first_name} ${user.last_name}`,
          title: "Staff of Penn State Orphanage",
          avatar:
            "https://pbs.twimg.com/profile_images/688487813025640448/E6O6I011_400x400.png",
          id: user.id,
        }))
      );
    });
  }, []);

  const value = React.useMemo(
    () => ({
      mentions,
    }),
    [mentions]
  );

  return <MentionsContext.Provider value={value} {...props} />;
};

export const useMentions = () => {
  const context = React.useContext(MentionsContext);
  if (context === undefined) {
    return { mentions: [] };
  }
  return context;
};
