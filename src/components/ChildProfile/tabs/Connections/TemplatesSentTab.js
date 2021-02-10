import React, { useEffect, useState } from "react";
import { fetchTemplatesSentByContactId } from "../../../../api/communicationTemplates";
import { templatesSentTableColumns } from "../../../../content/columns.data";
import { templatesSentTableData } from "../../../../content/templatesSent.data";
import { Spacing, Title } from "../../../ui/atoms";
import { Table } from "../../../ui/common/Table";

const TemplatesSentTab = ({ currentConnection }) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchTemplatesSentByContactId(currentConnection.id)
      .then(setData)
      .finally(() => setLoading(false));
  }, [currentConnection]);

  return (
    <div
      style={{
        position: "absolute",
        left: "5%",
        width: "90%",
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
          items={templatesSentTableData(data)}
        />
      </Spacing>
    </div>
  );
};

export default TemplatesSentTab;
