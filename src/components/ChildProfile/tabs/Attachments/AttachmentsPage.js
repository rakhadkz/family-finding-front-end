import { Box, Spacing } from "../../../ui/atoms";
import DocumentIcon from "@atlaskit/icon/glyph/document";
import { childAttachmentTableData } from "../../../../content/childAttachment.data";
import { Table } from "../../../ui/common/Table";
import { attachmentsTableColumns } from "../../../../content/columns.data";
import Button from "@atlaskit/button";
import { ModalDialog } from "../../../ui/common";
import { useContext, useEffect, useState } from "react";
import FilePicker from './FilePicker'
import { getLocalStorageUser } from "../../../../context/auth/authProvider";
import { fetchChildrenRequest } from "../../../../api/children";
import { ChildContext } from "../../../../pages/ChildProfilePage";

export const AttachmentsPage = () => {
  const { state: { child: { id } } } = useContext(ChildContext)
  const [ isOpen, setIsOpen ] = useState(false);
  const user_id = getLocalStorageUser().id;
  const [ attachments, setAttachments ] = useState([]);
  const [ trigger, setTrigger ] = useState(true);
  const [ pending, setPending ] = useState(true);
  const [ shouldCloseOnEscapePress, setShouldCloseOnEscapePress ] = useState(true)
  const [ shouldCloseOnOverlayClick, setShouldCloseOnOverlayClick ] = useState(true)
  useEffect(() => {
    setPending(true)
    fetchChildrenRequest({id: id, view: "attachments"})
      .then(data => setAttachments(data.attachments))
      .finally(() => setPending(false))
  }, [trigger])

  const setClosable = (bool) => {
    setShouldCloseOnEscapePress(bool)
    setShouldCloseOnOverlayClick(bool)
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
            body={<FilePicker user_id={user_id} child_id={id} setIsOpen={setIsOpen} setTrigger={setTrigger} setClosable={setClosable}/>}
            />
        </Box>
      </Spacing>
      <Spacing m={{ t: "23px" }}>
        <Table
          pending={pending}
          head={attachmentsTableColumns}
          items={childAttachmentTableData(attachments, setTrigger, setPending)}
        />
      </Spacing>
    </div>
  );
}
