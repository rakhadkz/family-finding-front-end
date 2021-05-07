import ReactAvatar from "react-avatar";
import Tooltip from "@atlaskit/tooltip";

export const Avatar = ({
  name,
  size = "large",
  ratio = 2.5,
  isChild = false,
}) => {
  return (
    <Tooltip content={name}>
      <ReactAvatar
        name={name}
        color={isChild ? "#8F62AD" : "#c1c7d0"}
        fgColor="#FFFFFF"
        round
        size={calculate_size(size)}
        textSizeRatio={ratio}
        textMarginRatio={0.2}
      />
    </Tooltip>
  );
};

const calculate_size = (size_name) => {
  switch (size_name) {
    case "xsmall":
      return "18px";
    case "small":
      return "24px";
    case "medium":
      return "36px";
    case "large":
      return "48px";
    case "slarge":
      return "56px";
    case "xlarge":
      return "102px";
    case "xxlarge":
      return "134px";
    default:
      return "34px";
  }
};
