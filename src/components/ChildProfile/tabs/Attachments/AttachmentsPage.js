import Button from "@atlaskit/button";
import React, { useEffect, useState } from "react";
import { Box, Spacing } from "../../../ui/atoms";
import DocumentIcon from "@atlaskit/icon/glyph/document";
import { childAttachmentTableData } from "../../../../content/childAttachment.data";
import { AttachmentsTable } from "./AttachmentsTable";

export const AttachmentsPage = ({ attachments }) => (
  <div>
    <Spacing m={{ t: "23px" }}>
      <Box w="100%" d="flex" direction="row-reverse">
        <Button iconBefore={DocumentIcon} appearance="primary">
          Upload new file
        </Button>
      </Box>
    </Spacing>
    <Spacing m={{ t: "23px" }}>
      <AttachmentsTable attachments={childAttachmentTableData(attachments)} />
    </Spacing>
  </div>
);
