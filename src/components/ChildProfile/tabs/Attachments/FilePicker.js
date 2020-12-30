import 'react-dropzone-uploader/dist/styles.css'
import Dropzone from 'react-dropzone-uploader'
import { Spacing } from '../../../ui/atoms'
import { uploadRequest } from '../../../../api/cloudinary';
import { createAttachmentRequest, createChildAttachmentRequest } from '../../../../api/attachments/attachmentRequest';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

export default function FilePicker({user_id, child_id}){
  const handleChangeStatus = ({ meta, file }, status) => { console.log(status, meta, file) }
  const history = useHistory();
  const [ pending, setPending ] = useState(false);
  const handleSubmit = (files, allFiles) => {
    setPending(true);
    allFiles.forEach(async(f) => {
      const { 
        resource_type, 
        original_filename, 
        bytes, 
        public_id, 
        secure_url, 
        format 
      } = await uploadRequest(f.file);
      if (!public_id){
        alert("Upload failed. Try again!");
        setPending(false);
        return;
      }
      const { id } = await createAttachmentRequest({
        "attachment": {
          "file_name": original_filename,
          "file_type": resource_type,
          "file_url": secure_url,
          "file_id": public_id,
          "file_size": bytes,
          "file_format": format,
          "user_id": user_id
        }
      });
      await createChildAttachmentRequest({
        "child_attachment": {
          "child_id": child_id,
          "attachment_id": id
        }
      });
      setPending(false);
      history.go(0);
    })
  }

  return (
    <Spacing m={{t: "30px", b: "30px"}}>
      <Dropzone
        onChangeStatus={handleChangeStatus}
        onSubmit={handleSubmit}
        accept="image/*,audio/*,video/*"
        submitButtonDisabled={pending}
      />
    </Spacing> 
  )
}