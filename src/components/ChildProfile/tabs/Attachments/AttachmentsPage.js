import { Box, Spacing } from "../../../ui/atoms";
import DocumentIcon from "@atlaskit/icon/glyph/document";
import { childAttachmentTableData } from "../../../../content/childAttachment.data";
import { Table } from "../../../ui/common/Table";
import { attachmentsTableColumns } from "../../../../content/columns.data";
import Button from "@atlaskit/button";
import { ModalDialog } from "../../../ui/common";
import { useEffect, useState } from "react";
import FilePicker from './FilePicker'
import { getLocalStorageUser } from "../../../../context/auth/authProvider";
import { fetchChildrenRequest } from "../../../../api/children";

export const AttachmentsPage = ({ child_id }) => {
  const [ isOpen, setIsOpen ] = useState(false);
  const { id } = getLocalStorageUser();
  const [ attachments, setAttachments ] = useState([]);
  const [ trigger, setTrigger ] = useState(false);
  const [ pending, setPending ] = useState(true);
  useEffect(() => {
    setPending(true)
    fetchChildrenRequest({id: child_id, view: "attachments"})
      .then(data => setAttachments(data.attachments))
      .finally(() => setPending(false))
  }, [trigger])
  return (
    <div>
      <Spacing m={{ t: "23px" }}>
        <Box w="100%" d="flex" direction="row-reverse">
          <Button appearance="primary" iconBefore={<DocumentIcon />} onClick={() => setIsOpen(true)}>
            Upload new file
          </Button>
          <ModalDialog
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              width="small"
              hasActions={false}
              body={<FilePicker user_id={id} child_id={child_id}/>}
            />
        </Box>
      </Spacing>
      <Spacing m={{ t: "23px" }}>
        <Table
          pending={pending}
          head={attachmentsTableColumns}
          items={childAttachmentTableData(attachments, setTrigger)}
        />
      </Spacing>
    </div>
  );
}
