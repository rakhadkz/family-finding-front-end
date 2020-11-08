import Avatar from "@atlaskit/avatar";
import Badge from "@atlaskit/badge";
import React from "react";
import styled from "styled-components";
import { useAuth } from "../../../context/auth/authContext";

export const SidebarUser = () => {
  var full_name = "";

  return (
    <SidebarUserContainer>
      <Avatar
        appearance="circle"
        src="https://pbs.twimg.com/profile_images/803832195970433027/aaoG6PJI_400x400.jpg"
        size="large"
      />
      <UserBadgeContainer>
        <Badge appearance="primary">{25}</Badge>
      </UserBadgeContainer>
      <UserNameText>{full_name}</UserNameText>
    </SidebarUserContainer>
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
