import Badge from "@atlaskit/badge";
import React from "react";
import styled from "styled-components";
import { getLocalStorageUser } from "../../../context/auth/authProvider";
import { Avatar } from "../molecules/Avatar";

export const SidebarUser = () => {
  const user = getLocalStorageUser();
  return (
    user && (
    <SidebarUserContainer>
      <Avatar name={`${user.first_name} ${user.last_name}`}/>
      <UserBadgeContainer>
        <Badge appearance="primary">{user?.badge}</Badge>
      </UserBadgeContainer>
      <UserNameText>
        {user?.first_name} {user?.last_name}
      </UserNameText>
    </SidebarUserContainer>
    )
  );
};

const SidebarUserContainer = styled.div`
  display: flex;
  cursor: pointer;
`;

const UserNameText = styled.div`
  font-family: Helvetica;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  color: #6b778c;
  display: flex;
  align-items: center;
  margin-left: 9px;
`;

const UserBadgeContainer = styled.div`
  position: absolute;
  left: 55px;
  margin-top: -15px;
`;
