import Button from "@atlaskit/button";
import React, { useEffect, useState } from "react";
import { Box, Spacing } from "../../../ui/atoms";
import DocumentIcon from "@atlaskit/icon/glyph/document";
import { fetchChildAttachments } from "../../../../context/children/childProvider";
import { childAttachmentTableData } from "../../../../content/childAttachment.data";
import { AttachmentsTable } from "./AttachmentsTable";

export const AttachmentsPage = () => {
  const [attachments, setAttachments] = useState([]);

  useEffect(() => {
    fetchChildAttachments(1).then((items) => {
      setAttachments(childAttachmentTableData(items));
    });
  }, []);

  return (
    <div>
      <Spacing m={{ t: "23px" }}>
        <Box w="100%" d="flex" direction="row-reverse">
          <Button iconBefore={DocumentIcon} appearance="primary">
            Upload new file
          </Button>
        </Box>
      </Spacing>
      <Spacing m={{ t: "23px" }}>
        <AttachmentsTable attachments={attachments} />
      </Spacing>
    </div>
  );
};
