import { Box, Spacing } from "../../../ui/atoms";
import DocumentIcon from "@atlaskit/icon/glyph/document";
import { childAttachmentTableData } from "../../../../content/childAttachment.data";
import { Table } from "../../../ui/common/Table";
import { attachmentsTableColumns } from "../../../../content/columns.data";
import Button from "@atlaskit/button";
import { ModalDialog } from "../../../ui/common";
import { useContext, useState } from "react";
import FilePicker from './FilePicker'
import { getLocalStorageUser } from "../../../../context/auth/authProvider";
import { ChildContext } from "../../../../pages/ChildProfilePage";
import { fetchAttachmentsRequest } from "../../../../reducers/attachment";

export const AttachmentsPage = () => {
  const { state: { child: { id } }, attachmentState: { attachments, loading }, attachmentDispatch, fetchAttachments } = useContext(ChildContext)
  const [ isOpen, setIsOpen ] = useState(false);
  const user_id = getLocalStorageUser().id;
  const [ shouldCloseOnEscapePress, setShouldCloseOnEscapePress ] = useState(true)
  const [ shouldCloseOnOverlayClick, setShouldCloseOnOverlayClick ] = useState(true)

  const setClosable = (bool) => {
    setShouldCloseOnEscapePress(bool)
    setShouldCloseOnOverlayClick(bool)
  }

  const setPending = () => {
    attachmentDispatch(fetchAttachmentsRequest())
  }

  return (
    <div>
      <Spacing m={{ t: "23px" }}>
        <Box w="100%" d="flex" direction="row-reverse">
          <Button appearance="primary" iconBefore={<DocumentIcon />} onClick={() => setIsOpen(true)}>
            Upload New File
          </Button>
          <ModalDialog
            shouldCloseOnEscapePress={shouldCloseOnEscapePress}
            shouldCloseOnOverlayClick={shouldCloseOnOverlayClick}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            width="small"
            hasActions={false}
            body={<FilePicker user_id={user_id} child_id={id} setIsOpen={setIsOpen} fetchAttachments={fetchAttachments} setClosable={setClosable}/>}
            />
        </Box>
      </Spacing>
      <Spacing m={{ t: "23px" }}>
        <Table
          pending={loading}
          head={attachmentsTableColumns}
          items={childAttachmentTableData(attachments, fetchAttachments, setPending)}
        />
      </Spacing>
    </div>
  );
}
