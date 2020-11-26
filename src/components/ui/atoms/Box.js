import styled from "styled-components";
import { prop } from "styled-tools";

export const Box = styled.div`
  position: ${prop("pos", "unset")};
  height: ${prop("h", "auto")};
  width: ${prop("w", "auto")};
  display: ${prop("d", "block")};
  align-items: ${prop("align", "unset")};
  justify-content: ${prop("justify", "unset")};
  flex-direction: ${prop("direction", "row")};
  margin-right: ${prop("mr", "0px")};
`;
