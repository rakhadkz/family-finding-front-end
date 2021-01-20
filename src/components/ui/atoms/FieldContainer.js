import { Spacing } from "./Spacing"

export const FieldContainer = ({ children }) => (
  <Spacing m={{ t: "8px", b: "8px"}}>
    { children }
  </Spacing>
)