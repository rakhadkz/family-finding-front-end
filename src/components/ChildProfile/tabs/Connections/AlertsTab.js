import React, { useState, useEffect, useContext } from "react";
import { ConnectionContext } from "./ConnectionModal";
import { FamilySearchItem } from "../FamilySearch/FamilySearchItem";
import { Box, Spacing, Title } from "../../../ui/atoms";

export const AlertsTab = () => {
  const {
    alertsState: { alerts },
  } = useContext(ConnectionContext);
  console.log(alerts);
  return (
    <Box mt="20px">
      {alerts?.map((alert) => (
        <FamilySearchItem
          created_at={alert?.family_search?.created_at}
          description={alert?.family_search?.description}
          noEdit
          noMeta
        />
      ))}
    </Box>
  );
};
