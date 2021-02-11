import AttachmentIcon from "@atlaskit/icon/glyph/attachment";
import CommentIcon from "@atlaskit/icon/glyph/comment";
import EmailIcon from "@atlaskit/icon/glyph/email";
import NotificationIcon from "@atlaskit/icon/glyph/notification-direct";
import Tabs from "@atlaskit/tabs";
import { Text } from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { Box } from "../../../ui/atoms";
import { AttachmentsTab } from "./AttachmentsTab";
import { CommentsTab } from "./CommentsTab";
import { ConnectionContext } from "./ConnectionModal";
import TemplatesSentTab from "./TemplatesSentTab";

export const ConnectionTabs = (props) => {
  const { attachmentState: { attachments }, commentState: { comments }, templateState: { templates } } = useContext(ConnectionContext);

  const tabs = [
    {
      label: (
        <Box d="flex" align="center" justify="center">
          <NotificationIcon />
          <Text style={{ fontSize: 15, paddingBottom: 10, paddingLeft: 5 }}>
            {" 0"} link alerts
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
            {templates.length} contacts
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
            {comments.length} comments
          </Text>
        </Box>
      ),
      content: <CommentsTab />
    },
    {
      label: (
        <Box d="flex" align="center" justify="center">
          <AttachmentIcon />
          <Text style={{ fontSize: 15, paddingBottom: 10, paddingLeft: 5 }}>
            {attachments.length} attachments
          </Text>
        </Box>
      ),
      content: <AttachmentsTab connection={props.currentConnection} />,
    },
  ];
  const [current, setCurrent] = useState(0);

  const selectTab = (tab, index) => {
    setCurrent(index);
  };

  return (
    <Tabs
      style={{ justifyContent: "center" }}
      onSelect={selectTab}
      selected={tabs[current]}
      tabs={tabs}
    />
  );
};
