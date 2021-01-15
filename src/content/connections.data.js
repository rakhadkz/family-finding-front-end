import { Box } from "../components/ui/atoms";
import { FitScore } from "../components/ui/molecules";
import Toggle from "@atlaskit/toggle";
import { Radio } from "@atlaskit/radio";
import { Label } from "../components/ui/atoms";
import { Switch } from "@chakra-ui/react";
import { Avatar } from "../components/ui/molecules/Avatar";

const connectionsTableData = (data) => {
  return data.map(function (item, index) {
    return {
      key: index,
      cells: [
        {
          key: "full_name",
          content: (
            <Box d="flex" align="center">
              <Avatar name={`${item?.contact?.first_name} ${item?.contact?.last_name}`} size="medium" />
              <a href="" style={{ marginLeft: "8px" }}>
                {`${item?.contact?.first_name || ""} ${
                  item?.contact?.last_name || ""
                }`}
              </a>
            </Box>
          ),
        },
        {
          key: "relationship",
          content: item?.contact?.relationship,
        },
        {
          key: "phone",
          content: item.contact?.phone,
        },
        {
          key: "email",
          content: item.contact?.email,
        },
        {
          key: "fit_score",
          content: (
            <FitScore
              score={
                item.contact?.score
                  ? item.contact?.score
                  : Math.floor(Math.random() * 6)
              }
            />
          ),
        },
        {
          key: "potential_match",
          content: (
            <Box
              d="flex"
              style={{
                marginTop: "10px",
                marginLeft: "30px",
              }}
            >
              <Switch id="sdfsd" />
            </Box>
          ),
        },
      ],
    };
  });
};

export { connectionsTableData };
