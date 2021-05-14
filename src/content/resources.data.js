import Button, { ButtonGroup } from "@atlaskit/button";
import CrossIcon from "@atlaskit/icon/glyph/cross";
import EditIcon from "@atlaskit/icon/glyph/edit";
import moment from "moment";
import { ACTIONS } from "../accessControl/actions";
import Can from "../accessControl/Can";
import { getLocalStorageUser } from "../context/auth/authProvider";
import { COMMUNICATION_TEMPLATES } from "../helpers";
import { humanReadableDateFormat } from "./date";

const resourcesData = (
  data,
  setIsOpen,
  setCurrentId,
  setIsOpenEdit,
  setCurrentResource
) => {
  const user = getLocalStorageUser();

  return data.map((item, index) => ({
    key: index,
    cells: [
      {
        key: "name",
        content: item?.name,
      },
      {
        key: "link",
        content: <a onClick={() => window.open(item?.link)}>{item?.link}</a>,
      },
      {
        key: "updated_at",
        content: moment(item?.updated_at).format(humanReadableDateFormat),
      },
      {
        key: "actions",
        content: (user.role === "super_admin" || item.organization_id) && (
          <div align="center">
            <Can
              perform={`${COMMUNICATION_TEMPLATES}:${ACTIONS.EDIT}`}
              yes={() => (
                <ButtonGroup>
                  <Button
                    onClick={() => {
                      setIsOpenEdit(true);
                      setCurrentResource(item);
                    }}
                    height="32px"
                    width="32px"
                  >
                    <EditIcon size="small" />
                  </Button>
                  <Button
                    onClick={() => {
                      setIsOpen(true);
                      setCurrentId(item.id);
                    }}
                    height="32px"
                    width="32px"
                  >
                    <CrossIcon size="small" />
                  </Button>
                </ButtonGroup>
              )}
            />
          </div>
        ),
      },
    ],
  }));
};

export { resourcesData };
