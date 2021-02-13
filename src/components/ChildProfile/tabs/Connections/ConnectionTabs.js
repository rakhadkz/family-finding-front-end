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
  const {
    alerts_size
  } = props.currentConnection;
  const {
    templateState: { templates },
    attachmentState: { attachments },
    commentState: { comments },
  } = useContext(ConnectionContext);

  const currentTab = props.currentTab

  const tabs = [
    {
      label: (
        <Box d="flex" align="center" justify="center">
          <EmailIcon />
          <Text style={{ fontSize: 15, paddingBottom: 10, paddingLeft: 5 }}>
            {templates?.length || 0} contacts
          </Text>
        </Box>
      ),
      content: <TemplatesSentTab />,
    },
    {
      label: (
        <Box d="flex" align="center" justify="center">
          <NotificationIcon />
          <Text style={{ fontSize: 15, paddingBottom: 10, paddingLeft: 5 }}>
            {alerts_size} link alerts
          </Text>
        </Box>
      ),
      content: <div></div>,
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
      content: <CommentsTab />,
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

  const getCurrentTab = () => {
    switch(currentTab){
      case "alerts": return 1;
      case "comments": return 2;
      case "attachments": return 3;
      default: return 0;
    }
  }

  const [current, setCurrent] = useState(getCurrentTab);

  const selectTab = (tab, index) => {
    setCurrent(index);
  };

  return <Tabs onSelect={selectTab} selected={tabs[current]} tabs={tabs} />;
};
