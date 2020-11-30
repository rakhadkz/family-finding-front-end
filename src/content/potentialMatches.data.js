import Avatar from "@atlaskit/avatar";
import { Radio } from "@atlaskit/radio";
import { Box } from "../components/ui/atoms";
import { Rating } from "../components/ui/molecules";

const potentialMatchesTableData = (data) => {
  return data.map(function (item, index) {
    return {
      key: index,
      cells: [
        {
          key: "full_name",
          content: (
            <Box d="flex" align="center">
              <Avatar appearance="circle" src={item.avatar} size="medium" />
              <a href="" style={{ marginLeft: "8px" }}>
                {item.first_name} {item.last_name}
              </a>
            </Box>
          ),
        },
        {
          key: "relationship",
          content: item.relationship,
        },
        {
          key: "phone",
          content: item.phone,
        },
        {
          key: "email",
          content: item.email,
        },
        {
          key: "rating",
          content: <Rating rating={item.rating} />,
        },
        {
          key: "status",
          content: (
            <Box d="flex">
              <Radio
                value="prefered"
                label="Prefered"
                name="prefered-radio"
                isChecked={true}
              />
              <Radio
                value="pass"
                label="Pass"
                name="pass-radio"
                isChecked={false}
              />
            </Box>
          ),
        },
      ],
    };
  });
};

export { potentialMatchesTableData };
