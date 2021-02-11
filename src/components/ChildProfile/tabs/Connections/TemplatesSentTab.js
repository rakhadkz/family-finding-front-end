import React, { useContext, useEffect, useState } from "react";
import { fetchTemplatesSentByContactId } from "../../../../api/communicationTemplates";
import { templatesSentTableColumns } from "../../../../content/columns.data";
import { templatesSentTableData } from "../../../../content/templatesSent.data";
import { Spacing, Title } from "../../../ui/atoms";
import { Table } from "../../../ui/common/Table";
import { ConnectionContext } from "./ConnectionModal";

const TemplatesSentTab = ({ currentConnection }) => {

  const { templateState: { templates, loading } } = useContext(ConnectionContext);

  return (
    <div
      style={{
        textAlign: "center",
      }}
    >
      <Title size="18px" style={{ marginTop: 15 }}>
        Messages sent to this user
      </Title>
      <Spacing m={{ t: "23px" }}>
        <Table
          pending={loading}
          head={templatesSentTableColumns}
          items={templatesSentTableData(templates)}
        />
      </Spacing>
    </div>
  );
};

export default TemplatesSentTab;
