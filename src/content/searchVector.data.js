import Button from "@atlaskit/button";
import { Box } from "../components/ui/atoms";
import Lozenge from "@atlaskit/lozenge";
import { Avatar } from "../components/ui/molecules/Avatar";
import CrossIcon from "@atlaskit/icon/glyph/cross";
import { GroupAccess } from "../components/common";

const searchVectorTableData = (data, history, setIsOpen, setCurrentSV) =>
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
        content: <p align="left">{item.description}</p>,
      }, // in_continuous_search
      {
        key: "in_continuous_search",
        content: <p align="left">{item.in_continuous_search ? "Yes" : "No"}</p>,
      },
      {
        key: "priority",
        content: <p align="left">{`${Math.floor(Math.random() * 6)}`}</p>,
      },
      {
        key: "delete",
        content: (
          <div align="center">
            <GroupAccess atLeast="admin" exact="super_admin">
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
