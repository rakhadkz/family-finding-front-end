import { Box } from "../components/ui/atoms";
import Avatar from "@atlaskit/avatar";

const childTableData = (data) =>
  data.map((item, index) => ({
    key: index,
    cells: [
      {
        key: "full_name",
        content: (
          <Box d="flex" align="center">
            <Avatar appearance="circle" src={item.avatar} size="medium" />
            <a href="" style={{ marginLeft: "8px" }}>
              {item.full_name}
            </a>
          </Box>
        ),
      },
      {
        key: "permanency_goal",
        content: item.permanency_goal,
      },
      {
        key: "continuous_search",
        content: item.continuous_search,
      },
      {
        key: "days_in_system",
        content: item.days_in_system,
      },
      {
        key: "relatives",
        content: item.relatives,
      },
      {
        key: "matches",
        content: item.matches,
      },
    ],
  }));

export { childTableData };
