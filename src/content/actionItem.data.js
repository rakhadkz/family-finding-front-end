import { Box } from "../components/ui/atoms";
import Avatar from "@atlaskit/avatar";
import { role_label } from "./sample.data";
import CrossIcon from "@atlaskit/icon/glyph/cross";
import Button, { LoadingButton } from "@atlaskit/button";

const actionItemTableData = (data, history, action, setIsOpen, setCurrentItem) => {
  console.log(data)
  return data.map(function (item, index) {
    const action = (
        <LoadingButton
          isDisabled={false}
          onClick={() => {
            setIsOpen(true);
            setCurrentItem(item.id);
          }}
          height="32px"
          width="32px"
        >
          <CrossIcon size="small" />
        </LoadingButton>
    )
    return {
      key: index,
      cells: [
        {
          key: "title",
          content: item.title,
        },
        {
          key: "description",
          content: item.description,
        },
        item.child ? {
          key: "child",
          content: (
            <Box d="flex" align="center">
              <Avatar
                appearance="circle"
                // src={/*item.child.avatar*/}
                size="medium"
              />
              <a href={`children/${item.child.id}#comments`} style={{ marginLeft: "8px" }}>
                {item.child.first_name + " " + item.child.last_name}
              </a>
            </Box>
          ),
        } : {          
          key: "child",
          content: ""
        },
        {
          key: "resolve",
          content: action,
        },
      ],
    };
  });
};

export { actionItemTableData };
