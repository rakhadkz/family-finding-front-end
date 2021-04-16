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
import { AlertsTab } from "./AlertsTab";
import { LinkScoreTab } from "../LinkScore/LinkScoreTab";
import StarFilledIcon from "@atlaskit/icon/glyph/star-filled";

export const ConnectionTabs = (props) => {
  const {
    alertsState: { alerts },
    templateState: { templates },
    attachmentState: { attachments },
    commentState: { comments },
  } = useContext(ConnectionContext);

  const currentTab = props.currentTab;

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
            {alerts.length} link alerts
          </Text>
        </Box>
      ),
      content: <AlertsTab />,
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
      content: <CommentsTab setCurrentCommentId={props.setCurrentCommentId} />,
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
    {
      label: (
        <Box d="flex" align="center" justify="center">
          <StarFilledIcon />
          <Text style={{ fontSize: 15, paddingBottom: 10, paddingLeft: 5 }}>
            Link Score
          </Text>
        </Box>
      ),
      content: <LinkScoreTab />,
    },
  ];

  const getCurrentTab = () => {
    switch (currentTab) {
      case "alerts":
        return 1;
      case "comments":
        return 2;
      case "attachments":
        return 3;
      default:
        return 0;
    }
  };

  const [current, setCurrent] = useState(getCurrentTab);

  const selectTab = (tab, index) => {
    setCurrent(index);
  };

  return <Tabs onSelect={selectTab} selected={tabs[current]} tabs={tabs} />;
};
