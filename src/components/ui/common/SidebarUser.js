import Avatar from "@atlaskit/avatar";
import Badge from "@atlaskit/badge";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { fetchMeRequest } from "../../../api/auth";
import { useAuth } from "../../../context/auth/authContext";

export const SidebarUser = () => {
  const [name, setName] = useState("");
  const [ava, setAva] = useState("");
  const [badge, setBadge] = useState(25);
  useEffect(() => {
    fetchMeRequest("sidebar_profile").then((data) => {
      console.log(data);
      setName(data.first_name + " " + data.last_name);
      setAva(data.ava);
    });
  }, []);
  return (
    <SidebarUserContainer>
      <Avatar appearance="circle" src={ava} size="large" />
      <UserBadgeContainer>
        <Badge appearance="primary">{25}</Badge>
      </UserBadgeContainer>
      <UserNameText>{name}</UserNameText>
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
