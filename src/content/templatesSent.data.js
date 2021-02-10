import Button, { ButtonGroup } from "@atlaskit/button";
import ArrowDownIcon from "@atlaskit/icon/glyph/arrow-down";
import ArrowUpIcon from "@atlaskit/icon/glyph/arrow-up";
import { SimpleTag as Tag } from "@atlaskit/tag";
import { Text } from "@chakra-ui/react";
import moment from "moment";
import { useState } from "react";
import { ACTIONS } from "../accessControl/actions";
import Can from "../accessControl/Can";
import { COMMUNICATION_TEMPLATES } from "../helpers";
import { humanReadableDateFormat } from "./date";

const templatesSentTableData = (data) =>
  data.map((item, index) => ({
    key: index,
    cells: [
      {
        key: "date",
        content: moment(item?.created).format(humanReadableDateFormat),
      },
      {
        key: "template_type",
        content: item?.communication_template?.template_type,
      },
      {
        key: "status",
        content: <Tag text="PENDING" color="yellow" />,
      },
      {
        key: "updated_at",
        content: moment(item?.updated_at).format(humanReadableDateFormat),
      },
      {
        key: "actions",
        content: <Toogler item={item} />,
      },
    ],
  }));

const Toogler = ({ item }) => {
  const [toogled, setToogled] = useState(false);

  return (
    <div align="center">
      <Can
        perform={`${COMMUNICATION_TEMPLATES}:${ACTIONS.EDIT}`}
        yes={() => (
          <ButtonGroup>
            <Button
              onClick={() => setToogled(!toogled)}
              height="32px"
              width="32px"
            >
              {toogled ? (
                <ArrowUpIcon size="small" />
              ) : (
                <ArrowDownIcon size="small" />
              )}
            </Button>
          </ButtonGroup>
        )}
      />
      {toogled && (
        <div style={{ border: "2px solid #DFE1E6", width: "100%" }}>
          <Text dangerouslySetInnerHTML={{ __html: item.content }}></Text>
        </div>
      )}
    </div>
  );
};

export { templatesSentTableData };
