import styled from "styled-components";
import { prop } from "styled-tools";

export const Title = styled.div`
  font-family: Helvetica;
  font-style: normal;
  font-weight: bold;
  font-size: ${prop("size", "20px")};
  line-height: 24px;
`;
