import Button from "@atlaskit/button";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { ChildContext } from "../../../../pages/ChildProfilePage";
import { Box, Spacing } from "../../../ui/atoms";
import { SelectInput } from "../../../ui/molecules";

export function AutomatedSearch({ vectors }) {
  const { control, errors, handleSubmit } = useForm();
  const {
    connectionState: { connections },
  } = useContext(ChildContext);
  const onHandle = (data) => {
    const { contact } = connections.find(
      (item) => item.id === data.connection.value
    );
    fetch(
      `https://www.bop.gov/PublicInfo/execute/inmateloc?todo=query&output=json&nameFirst=${contact?.first_name}&nameLast=${contact?.last_name}`,
      {
        method: "GET",
      }
    ).then((e) => console.log(e));
  };
  return (
    <Spacing p={{ b: "16px" }}>
      <form onSubmit={handleSubmit(onHandle)}>
        <Box d="flex" align="flex-end">
          <SelectInput
            register={{ required: true }}
            error={errors.search_vector}
            marginY="0px"
            className="input"
            name="search_vector"
            options={vectors}
            control={control}
            label="Select Automated Search Vector"
          />
          <SelectInput
            register={{ required: true }}
            error={errors.connection}
            marginY="0px"
            marginX={"16px"}
            className="input"
            name="connection"
            options={connections.map(
              ({ id, contact: { first_name, last_name } }) => ({
                label: `${first_name} ${last_name}`,
                value: id,
              })
            )}
            control={control}
            label="Select Connection"
          />
          <Button type="submit" appearance="primary">
            Run Now
          </Button>
        </Box>
      </form>
    </Spacing>
  );
}
