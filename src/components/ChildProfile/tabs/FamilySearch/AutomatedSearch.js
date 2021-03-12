import Button, { ButtonGroup } from "@atlaskit/button";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { ChildContext } from "../../../../pages/ChildProfilePage";
import { Preloader } from "../../../../pages/Preloader";
import { Box, Spacing, Title } from "../../../ui/atoms";
import { AvatarGroup, SelectInput } from "../../../ui/molecules";
import { months } from "./";
import { getLocalStorageUser } from "../../../../context/auth/authProvider";
import { StyledLabel } from "../../ChildInformation";
import {
  automatedSearchResultRequest,
  createSearchResultConnectionRequest,
  createSearchResultRequest,
} from "../../../../api/searchResults/searchResultsRequests";

export function AutomatedSearch({ vectors, fetch, setIsOpen }) {
  const { control, errors, handleSubmit } = useForm();
  const {
    state: {
      child: { id: child_id },
    },
    connectionState: { connections },
  } = useContext(ChildContext);
  const { id: user_id } = getLocalStorageUser();
  const [pending, setPending] = useState(false);
  const onHandle = async (data) => {
    setPending(true);
    const {
      contact: { first_name, last_name },
    } = connections.find((item) => item.id === data.connection.value);
    const { id: family_search_id } = await createSearchResultRequest({
      search_vector_id: data.search_vector.value,
      user_id,
      child_id,
    });
    await createSearchResultConnectionRequest(
      family_search_id,
      data.connection.value
    );
    await automatedSearchResultRequest({
      task: "bop",
      first_name,
      last_name,
      family_search_id,
    });
    await fetch();
    setPending(false);
    setIsOpen(false);
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
          <Button type="submit" appearance="primary" isDisabled={pending}>
            Run Now
          </Button>
        </Box>
      </form>
    </Spacing>
  );
}

const Item = ({ data }) => {
  let date = new Date();
  const { description, connections, search_vector, user } = data;
  return (
    <Box d="flex">
      <Box d="flex" direction="column">
        <Title>{date.getDate()}</Title>
        <span>{months[date.getMonth()]}</span>
        <span>{date.getFullYear()}</span>
      </Box>
      <div style={{ marginLeft: "16px", width: "100%" }}>
        <p dangerouslySetInnerHTML={{ __html: description }}></p>
        <Box mt="11px" d="flex">
          <ButtonGroup>
            <AvatarGroup
              data={connections.map(
                ({
                  child_contact: {
                    contact: { first_name, last_name },
                  },
                }) => ({
                  name: first_name + " " + last_name,
                })
              )}
            />
          </ButtonGroup>
        </Box>
        <Box mt="10px" d="flex" justify="space-between">
          <StyledLabel>
            Found via {search_vector.name} by{" "}
            {`${user.first_name} ${user.last_name}`}
          </StyledLabel>
          <Button appearance="link" spacing="none">
            Save
          </Button>
        </Box>
        <Spacing
          style={{ borderBottom: "1px solid #dee1e5" }}
          m={{ t: "8px", b: "8px" }}
        />
      </div>
    </Box>
  );
};

const getData = (contact) => {
  return `<p>First Name: <strong>${contact.nameFirst}</strong></p><p>Last Name: <strong>${contact.nameLast}</strong></p><p>Age: <strong>${contact.age}</strong></p><p>Race: <strong>${contact.race}</strong></p><p>Sex: <strong>${contact.sex}</strong></p>`;
};
