import PdfDocument24Icon from "@atlaskit/icon-file-type/glyph/pdf-document/24";
import PowerpointPresentation24Icon from "@atlaskit/icon-file-type/glyph/powerpoint-presentation/24";
import WordDocument24Icon from "@atlaskit/icon-file-type/glyph/word-document/24";
import ExcelSpreadsheet24Icon from "@atlaskit/icon-file-type/glyph/excel-spreadsheet/24";
import Image24Icon from '@atlaskit/icon-file-type/glyph/image/24';
import Video24Icon from '@atlaskit/icon-file-type/glyph/video/24';
import { Box } from "../components/ui/atoms";

const childAttachmentTableData = (data) =>
  data && data.map((item, index) => ({
    key: index,
    cells: [
      {
        key: "file_name",
        content: (
          <Box d="flex" align="center">
            <AttachmentIcon type={item.file_type}/>
            <a href={item.file_url} target="_blank" style={{ marginLeft: "16px" }}>{`${item.file_name}.${item.file_format || ''}`}</a>
          </Box>
        ),
      },
      {
        key: "size",
        content: humanFileSize(item.file_size),
      },
      {
        key: "author",
        content: `${item.user.first_name} ${item.user.last_name}`,
      },
      {
        key: "date",
        content: changeDate(item.created_at),
      },
    ],
  }));

const AttachmentIcon = ({type}) => {
  switch (type) {
    case "ppt":
      return <PowerpointPresentation24Icon />;
    case "doc" || "docx":
      return <WordDocument24Icon />;
    case "xlsx" || "xlsm" || "xlsb" || "xls":
      return <ExcelSpreadsheet24Icon />;
    case "image":
      return <Image24Icon/>
    case "video":
      return <Video24Icon/>
    default:
      return <PdfDocument24Icon />;
  }
};

function changeDate(date){
  let currentDate = new Date(date);
  var fd = currentDate.toDateString();
  return fd;
}

function humanFileSize(bytes, si=true, dp=1) {
  const thresh = si ? 1000 : 1024;

  if (Math.abs(bytes) < thresh) {
    return bytes + ' B';
  }

  const units = si 
    ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'] 
    : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
  let u = -1;
  const r = 10**dp;

  do {
    bytes /= thresh;
    ++u;
  } while (Math.round(Math.abs(bytes) * r) / r >= thresh && u < units.length - 1);


  return bytes.toFixed(dp) + ' ' + units[u];
}

export { childAttachmentTableData };
