import Button, { ButtonGroup } from "@atlaskit/button";
import CrossIcon from "@atlaskit/icon/glyph/cross";
import EditIcon from "@atlaskit/icon/glyph/edit";
import moment from "moment";
import { GroupAccess } from "../components/common";
import { TEMPLATE_TYPES } from "../components/CommunicationTemplate";

const communicationTemplatesData = (
  data,
  setIsOpen,
  setCurrentId,
  setIsOpenEdit,
  setCurrentTemplate
) =>
  data.map((item, index) => ({
    key: index,
    cells: [
      {
        key: "name",
        content: item?.name,
      },
      {
        key: "template_type",
        content: item?.template_type,
      },
      {
        key: "updated_at",
        content: moment(item?.updated_at).format("YYYY-MM-DD"),
      },
      {
        key: "actions",
        content: (
          <GroupAccess atLeast="admin" exact="super_admin">
            <ButtonGroup>
              <Button
                onClick={() => {
                  setIsOpenEdit(true);
                  setCurrentTemplate({
                    ...item,
                    template_type: TEMPLATE_TYPES.find(
                      (type) => type.label === item.template_type
                    ),
                  });
                  console.log("WSSSSSS", {
                    ...item,
                    template_type: TEMPLATE_TYPES.find(
                      (type) => type.label === item.template_type
                    ),
                  });
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
          </GroupAccess>
        ),
      },
    ],
  }));

export { communicationTemplatesData };