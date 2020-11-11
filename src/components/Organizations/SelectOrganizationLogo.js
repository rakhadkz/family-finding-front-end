import Button from "@atlaskit/button";
import styled from "styled-components";
import { Label } from "../ui/atoms";

export const SelectOrganizationLogo = ({ onClick }) => {
  return (
    <Container>
      <Label style={{ display: "block" }}>Logo</Label>
      <Button onClick={onClick}>
        <ButtonContentWrapper>Upload Logo</ButtonContentWrapper>
      </Button>
    </Container>
  );
};

const Container = styled.div`
  margin-top: 18px;
`;

const ButtonContentWrapper = styled.div`
  font-family: Helvetica;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
`;
