import AvatarGroup from "@atlaskit/avatar-group";
import Breadcrumbs, { BreadcrumbsItem } from "@atlaskit/breadcrumbs";
import EmojiSymbolsIcon from "@atlaskit/icon/glyph/emoji/symbols";
import React from "react";
import { useHistory } from "react-router-dom";
import {
  Assign,
  ChildInformation,
  ChildTabs,
  GenerateLetter,
  PlaceCall,
  RelativesList,
  SendEmail,
  SetReminder,
} from "../components/ChildProfile";
import { Box, Spacing, Title } from "../components/ui/atoms";
import { Sidebar } from "../components/ui/common";
import { SidebarTemplate } from "../components/ui/templates";
import { CHILDREN } from "../helpers";

export const ChildProfilePage = () => {
  const history = useHistory();
  const data = [
    {
      email: "makhanbet.kyzylorda@gmail.com",
      key: "makhanbet.kyzylorda@gmail.com",
      name: "Bekzat",
      href: "#",
    },
    {
      email: "makhanbet.kyzylorda@gmail.com",
      key: "makhanbet.kyzylorda@gmail.com",
      name: "Bekzat",
      href: "#",
    },
    {
      email: "makhanbet.kyzylorda@gmail.com",
      key: "makhanbet.kyzylorda@gmail.com",
      name: "Bekzat",
      href: "#",
    },
    {
      email: "makhanbet.kyzylorda@gmail.com",
      key: "makhanbet.kyzylorda@gmail.com",
      name: "Bekzat",
      href: "#",
    },
    {
      email: "makhanbet.kyzylorda@gmail.com",
      key: "makhanbet.kyzylorda@gmail.com",
      name: "Bekzat",
      href: "#",
    },
    {
      email: "makhanbet.kyzylorda@gmail.com",
      key: "makhanbet.kyzylorda@gmail.com",
      name: "Bekzat",
      href: "#",
    },
  ];

  return (
    <SidebarTemplate sidebar={<Sidebar />}>
      <Box d="flex" justify="space-between">
        <Title>Children Profile</Title>
        <Box d="flex">
          <SetReminder />
          <Spacing m="0px 10px">
            <Assign />
          </Spacing>
          <AvatarGroup appearance="stack" data={data} />
        </Box>
      </Box>
      <Spacing m={{ t: "28px" }}>
        <Breadcrumbs>
          <BreadcrumbsItem
            iconBefore={
              <Spacing m={{ r: "7px" }}>
                <EmojiSymbolsIcon primaryColor="#2684FF" />
              </Spacing>
            }
            onClick={() => history.replace(CHILDREN)}
            text="Children"
          />
          <BreadcrumbsItem text="Children Profile" />
        </Breadcrumbs>
      </Spacing>
      <Spacing m={{ t: "22px" }}>
        <ChildInformation />
      </Spacing>
      <Spacing m={{ t: "22px" }}>
        <RelativesList />
      </Spacing>
      <Spacing m={{ t: "16px" }}>
        <Box d="flex">
          <GenerateLetter />
          <Spacing m="0px 10px">
            <SendEmail />
          </Spacing>
          <PlaceCall />
        </Box>
      </Spacing>
      <Spacing m={{ t: "40px" }}>
        <ChildTabs />
      </Spacing>
    </SidebarTemplate>
  );
};
