import Button, { ButtonGroup } from "@atlaskit/button";
import { Box } from "../components/ui/atoms";
import Lozenge from "@atlaskit/lozenge";
import { Avatar } from "../components/ui/molecules/Avatar";
import CrossIcon from "@atlaskit/icon/glyph/cross";
import { GroupAccess } from "../components/common";
import EditIcon from "@atlaskit/icon/glyph/edit";

const searchVectorTableData = (
  data,
  history,
  setIsOpen,
  setCurrentSV,
  setIsAddModalOpen,
  setEdit
) =>
  data.map((item, index) => ({
    key: index,
    id: item.id,
    cells: [
      {
        key: "name",
        content: <p align="left">{item.name}</p>,
      },
      {
        key: "description",
        content: (
          <p
            align="left"
            dangerouslySetInnerHTML={{ __html: item.description }}
          ></p>
        ),
      },
      // {
      //   key: "in_continuous_search",
      //   content: <p align="left">{item.in_continuous_search ? "Yes" : "No"}</p>,
      // },
      {
        key: "priority",
        content: <p align="left">{`${Math.floor(Math.random() * 6)}`}</p>,
      },
      {
        key: "Actions",
        content: (
          <div align="center">
            <GroupAccess atLeast="admin" exact="super_admin">
              <ButtonGroup>
                <Button
                  // isDisabled={user?.id === item.id}
                  onClick={() => {
                    setIsAddModalOpen(true);
                    setCurrentSV(item.id);
                    setEdit(true);
                  }}
                  height="32px"
                  width="32px"
                >
                  <EditIcon size="small" />
                </Button>
                <Button
                  // isDisabled={user?.id === item.id}
                  onClick={() => {
                    setIsOpen(true);
                    setCurrentSV(item.id);
                  }}
                  height="32px"
                  width="32px"
                >
                  <CrossIcon size="small" />
                </Button>
              </ButtonGroup>
            </GroupAccess>
          </div>
        ),
      },
    ],
  }));

const inContinuousSearchOptions = [
  {
    label: "Yes",
    value: "Yes",
  },
  { label: "No", value: "No" },
];

export { searchVectorTableData, inContinuousSearchOptions };
