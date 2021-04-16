import { useContext } from "react";
import styled from "styled-components";
import { ConnectionContext } from "../Connections/ConnectionModal";

export const ContactInfoTab = () => {
  const { currentConnection } = useContext(ConnectionContext);
  return (
    <div style={{ paddingTop: 17 }}>
      <InfoItem>
        <b>Email:</b>
        <span>{currentConnection?.contact.email}</span>
      </InfoItem>
      <InfoItem>
        <b>Address:</b>
        <span>{currentConnection?.contact?.address?.address_1}</span>
      </InfoItem>
      <InfoItem>
        <b>Phone:</b>
        <span>{currentConnection?.contact.phone}</span>
      </InfoItem>
    </div>
  );
};

const InfoItem = styled.div`
  display: flex;
  margin: 13px 0;
  span,
  b {
    font-size: 15px;
  }
  b {
    margin-right: 15px;
  }
`;
