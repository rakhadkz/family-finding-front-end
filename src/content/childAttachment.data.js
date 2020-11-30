import PdfDocument24Icon from "@atlaskit/icon-file-type/glyph/pdf-document/24";
import PowerpointPresentation24Icon from "@atlaskit/icon-file-type/glyph/powerpoint-presentation/24";
import WordDocument24Icon from "@atlaskit/icon-file-type/glyph/word-document/24";
import ExcelSpreadsheet24Icon from "@atlaskit/icon-file-type/glyph/excel-spreadsheet/24";
import { Box } from "../components/ui/atoms";

const childAttachmentTableData = (data) =>
  data.map((item, index) => ({
    key: index,
    cells: [
      {
        key: "file_name",
        content: (
          <Box d="flex" align="center">
            <AttachmentIcon />
            <span style={{ marginLeft: "16px" }}>{item.file_name}</span>
          </Box>
        ),
      },
      {
        key: "size",
        content: item.file_size,
      },
      {
        key: "author",
        content: `${item.user.first_name} ${item.user.last_name}`,
      },
      {
        key: "date",
        content: item.created_at,
      },
    ],
  }));

const AttachmentIcon = (type) => {
  switch (type) {
    case "ppt":
      return <PowerpointPresentation24Icon />;
    case "doc" || "docx":
      return <WordDocument24Icon />;
    case "xlsx" || "xlsm" || "xlsb" || "xls":
      return <ExcelSpreadsheet24Icon />;
    default:
      return <PdfDocument24Icon />;
  }
};

export { childAttachmentTableData };
