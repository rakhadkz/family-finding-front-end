import React, { useContext } from "react";
import { templatesSentTableColumns } from "../../../../content/columns.data";
import { templatesSentTableData } from "../../../../content/templatesSent.data";
import { Spacing, Title } from "../../../ui/atoms";
import { Table } from "../../../ui/common/Table";
import { ConnectionContext } from "./ConnectionModal";

const TemplatesSentTab = () => {
  const {
    templateState: { templates, loading },
  } = useContext(ConnectionContext);

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
          emptyView="Empty"
          pending={loading}
          head={templatesSentTableColumns}
          items={templatesSentTableData(templates)}
        />
      </Spacing>
    </div>
  );
};

export default TemplatesSentTab;
