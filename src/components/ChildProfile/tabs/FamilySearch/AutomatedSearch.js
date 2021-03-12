import Button, { ButtonGroup } from "@atlaskit/button";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { ChildContext } from "../../../../pages/ChildProfilePage";
import { Preloader } from "../../../../pages/Preloader";
import { Box, Spacing, Title } from "../../../ui/atoms";
import { AvatarGroup, SelectInput } from "../../../ui/molecules";
import Spinner from "@atlaskit/spinner";
import { months } from "./";
import { getLocalStorageUser } from "../../../../context/auth/authProvider";
import { StyledLabel } from "../../ChildInformation";
import { prisonRequest } from "../../../../api/searchVectors/searchVectorsRequests";

export function AutomatedSearch({ vectors }) {
  const { control, errors, handleSubmit } = useForm();
  const {
    connectionState: { connections },
  } = useContext(ChildContext);
  const { user } = getLocalStorageUser();
  const [results, setResults] = useState([]);
  const [pending, setPending] = useState(false);
  const onHandle = (data) => {
    setPending(true);
    const { contact } = connections.find(
      (item) => item.id === data.connection.value
    );
    console.log(user);
    prisonRequest(contact.first_name, contact.last_name)
      .then((e) => {
        console.log(e.InmateLocator);
        setResults(
          e?.InmateLocator.map((item) => ({
            attachments: [],
            connections: [
              {
                child_contact: {
                  contact: {
                    first_name: contact?.first_name,
                    last_name: contact?.last_name,
                  },
                },
              },
            ],
            search_vector: {
              name: data.search_vector.label,
            },
            description: getData({
              first_name: item.nameFirst,
              last_name: item.nameLast,
              sex: item.sex,
              age: item.age,
              race: item.race,
            }),
            user: { first_name: "ACME", last_name: "County" },
          }))
        );
      })
      .finally(() => setPending(false));
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
      {pending && (
        <div style={{ margin: "30px 0px" }}>
          <Preloader />
        </div>
      )}
      {!pending && results.length > 0 && (
        <div style={{ marginTop: 20 }}>
          {results.map((item) => (
            <Item data={item} />
          ))}
        </div>
      )}
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
  return `<p>First Name: <strong>${contact?.first_name}</strong></p><p>Last Name: <strong>${contact?.last_name}</strong></p><p>Age: <strong>${contact.age}</strong></p><p>Race: <strong>${contact.race}</strong></p><p>Sex: <strong>${contact.sex}</strong></p>`;
};
