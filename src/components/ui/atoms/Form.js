import styled from "styled-components";
import { prop } from "styled-tools";

export const Form = styled.form`
  width: ${prop("w", "300px")};
  max-width: 100%;
  display: flex;
  flex-direction: column;
`;
