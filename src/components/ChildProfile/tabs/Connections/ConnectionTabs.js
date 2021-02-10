import AttachmentIcon from "@atlaskit/icon/glyph/attachment";
import CommentIcon from "@atlaskit/icon/glyph/comment";
import EmailIcon from "@atlaskit/icon/glyph/email";
import NotificationIcon from "@atlaskit/icon/glyph/notification-direct";
import Tabs from "@atlaskit/tabs";
import { Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { Box } from "../../../ui/atoms";
import TemplatesSentTab from "./TemplatesSentTab";

export const ConnectionTabs = (props) => {
  const tabs = [
    {
      label: (
        <Box d="flex" align="center" justify="center">
          <NotificationIcon />
          <Text style={{ fontSize: 15, paddingBottom: 10, paddingLeft: 5 }}>
            {" 5"} link alerts
          </Text>
        </Box>
      ),
      content: <div></div>,
    },
    {
      label: (
        <Box d="flex" align="center" justify="center">
          <EmailIcon />
          <Text style={{ fontSize: 15, paddingBottom: 10, paddingLeft: 5 }}>
            {" 5"} contacts
          </Text>
        </Box>
      ),
      content: <TemplatesSentTab {...props} />,
    },
    {
      label: (
        <Box d="flex" align="center" justify="center">
          <CommentIcon />
          <Text style={{ fontSize: 15, paddingBottom: 10, paddingLeft: 5 }}>
            {" 5"} comments
          </Text>
        </Box>
      ),
    },
    {
      label: (
        <Box d="flex" align="center" justify="center">
          <AttachmentIcon />
          <Text style={{ fontSize: 15, paddingBottom: 10, paddingLeft: 5 }}>
            {" 5"} attachments
          </Text>
        </Box>
      ),
      content: <div></div>,
    },
  ];
  const [current, setCurrent] = useState(0);

  const selectTab = (tab, index) => {
    setCurrent(index);
  };

  return <Tabs onSelect={selectTab} selected={tabs[current]} tabs={tabs} />;
};
