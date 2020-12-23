import AvatarGroup from "@atlaskit/avatar-group";
import Breadcrumbs, { BreadcrumbsItem } from "@atlaskit/breadcrumbs";
import Button from "@atlaskit/button";
import EmailIcon from "@atlaskit/icon/glyph/email";
import EmojiSymbolsIcon from "@atlaskit/icon/glyph/emoji/symbols";
import MentionIcon from "@atlaskit/icon/glyph/mention";
import MobileIcon from "@atlaskit/icon/glyph/mobile";
import NotificationIcon from "@atlaskit/icon/glyph/notification-direct";
import WatchIcon from "@atlaskit/icon/glyph/watch";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  ChildInformation,
  ChildTabs,
  RelativesList
} from "../components/ChildProfile";
import { Box, Spacing, Title } from "../components/ui/atoms";
import { Sidebar } from "../components/ui/common";
import { SidebarTemplate } from "../components/ui/templates";
import { fetchChildren } from "../context/children/childProvider";
import { CHILDREN } from "../helpers";

export const ChildProfilePage = (props) => {
  const history = useHistory();
  const id = props.match.params.id;
  const [child, setChild] = useState({});
  useEffect(() => {
    fetchChildProfile();
  }, []);

  useEffect(() => {
    console.log("CHILD",child);
  }, [child]);

  const fetchChildProfile = async () => {
    console.log("CALLED FETCH PROFILE");
    setChild({})
    await fetchChildren({ id: id, view: "extended" }).then(
      (item) => item && setChild(item)
    );
  };

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
        <Title>{`${child.first_name} ${child.last_name}`}</Title>
        <Box d="flex">
          <Button appearance="primary" iconBefore={<NotificationIcon />}>
            Set Reminder
          </Button>
          <Spacing m="0px 10px">
            <Button appearance="primary" iconBefore={<WatchIcon />}>
              Assign
            </Button>
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
            onClick={() => history.push(`../${CHILDREN}`)}
            text="Children"
          />
          <BreadcrumbsItem text={`${child.first_name} ${child.last_name}`} />
        </Breadcrumbs>
      </Spacing>
      <Spacing m={{ t: "22px" }}>
        <ChildInformation child={child} />
      </Spacing>
      <Spacing m={{ t: "22px" }}>
        <RelativesList relatives={child.contacts || []} />
      </Spacing>
      <Spacing m={{ t: "16px" }}>
        <Box d="flex">
          <Button iconBefore={<EmailIcon />} isSelected>
            Generate Letter
          </Button>
          <Spacing m="0px 10px">
            <Button iconBefore={<MentionIcon />} isSelected>
              Send Email
            </Button>
          </Spacing>
          <Button iconBefore={<MobileIcon />} isSelected>
            PlaceCall
          </Button>
        </Box>
      </Spacing>
      <Spacing m={{ t: "40px" }}>
        {<ChildTabs {...child} refreshContacts={fetchChildProfile} />}
      </Spacing>
    </SidebarTemplate>
  );
};
