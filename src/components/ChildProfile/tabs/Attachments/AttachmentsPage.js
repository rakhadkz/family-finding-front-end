import { Box, Spacing } from "../../../ui/atoms";
import DocumentIcon from "@atlaskit/icon/glyph/document";
import { childAttachmentTableData } from "../../../../content/childAttachment.data";
import { Table } from "../../../ui/common/Table";
import { attachmentsTableColumns } from "../../../../content/columns.data";
import Button from "@atlaskit/button";

export const AttachmentsPage = ({ attachments }) => (
  <div>
    <Spacing m={{ t: "23px" }}>
      <Box w="100%" d="flex" direction="row-reverse">
        <Button appearance="primary" iconBefore={<DocumentIcon />}>
          Upload new file
        </Button>
      </Box>
    </Spacing>
    <Spacing m={{ t: "23px" }}>
      <Table
        head={attachmentsTableColumns}
        items={childAttachmentTableData(attachments)}
      />
    </Spacing>
  </div>
);
