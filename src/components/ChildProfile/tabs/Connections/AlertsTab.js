import React, { useContext } from "react";
import { ConnectionContext } from "./ConnectionModal";
import { FamilySearchItem } from "../FamilySearch/FamilySearchItem";
import { Box } from "../../../ui/atoms";

export const AlertsTab = () => {
  const {
    alertsState: { alerts },
  } = useContext(ConnectionContext);
  return (
    <Box mt="20px">
      {alerts?.map((alert) => (
        <FamilySearchItem item={alert} noEdit noMeta />
      ))}
    </Box>
  );
};
