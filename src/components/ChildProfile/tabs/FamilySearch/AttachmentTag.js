import PdfDocument16Icon from "@atlaskit/icon-file-type/glyph/pdf-document/16";
import Generic16Icon from "@atlaskit/icon-file-type/glyph/generic/16";
import PowerpointPresentation16Icon from "@atlaskit/icon-file-type/glyph/powerpoint-presentation/16";
import WordDocument16Icon from "@atlaskit/icon-file-type/glyph/word-document/16";
import ExcelSpreadsheet16Icon from "@atlaskit/icon-file-type/glyph/excel-spreadsheet/16";
import Image16Icon from "@atlaskit/icon-file-type/glyph/image/16";
import Video16Icon from "@atlaskit/icon-file-type/glyph/video/16";
import { Rounded } from "../../../ui/molecules/Rounded";

export const AttachmentTag = ({
  file_format,
  file_name,
  onClick = () => {},
}) => {
  return (
    <Rounded
      content={
        <AttachmentItem file_format={file_format} file_name={file_name} />
      }
      onClick={onClick}
    />
  );
};

export const AttachmentItem = ({ file_format, file_name }) => {
  return (
    <>
      <AttachmentIcon file_format={file_format} />
      <span style={{ marginLeft: "10px", color: "#455670" }}>{file_name}</span>
    </>
  );
};

const AttachmentIcon = ({ file_format }) => {
  switch (file_format) {
    case "ppt":
    case "pptx":
      return <PowerpointPresentation16Icon />;
    case "doc":
    case "docx":
      return <WordDocument16Icon />;
    case "xlsx":
    case "xlsm":
    case "xlsb":
    case "xls":
      return <ExcelSpreadsheet16Icon />;
    case "png":
    case "jpeg":
    case "jpg":
      return <Image16Icon />;
    case "mp4":
      return <Video16Icon />;
    case "pdf":
      return <PdfDocument16Icon />;
    default:
      return <Generic16Icon />;
  }
};
