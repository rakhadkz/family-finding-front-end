import Button, { ButtonGroup } from "@atlaskit/button";
import Checkbox from "@atlaskit/checkbox";
import Textfield from "@atlaskit/textfield";
import Tooltip from "@atlaskit/tooltip";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { relationshipOptions } from "../../content/relationshipOptions.data";
import { states } from "../../content/states.data";
import { race_options, sex_options } from "../../helpers";
import { getObjectByLabel } from "../Children";
import { Box, Form, Label, Spacing } from "../ui/atoms";
import { DatepickerInput, SelectInput, TextInput } from "../ui/molecules";
import AddIcon from "@atlaskit/icon/glyph/add";
import { B400 } from "@atlaskit/theme/colors";
import styled from "styled-components";

const DynamicDataItem = ({ filed, isCurrent = false, onClick }) => {
  return (
    <Box d="flex" align="center">
      <Tooltip content="Is current">
        <Checkbox isDisabled={true} isChecked={isCurrent} />
      </Tooltip>
      <div style={{ width: 180, marginLeft: 5, overflow: "scroll" }}>
        {filed}
      </div>{" "}
      <Button
        spacing="none"
        onClick={onClick}
        appearance="subtle"
        style={{
          borderRadius: 20,
          marginLeft: 15,
          padding: "3px 9px",
        }}
      >
        ✕
      </Button>
    </Box>
  );
};

export const AddContactForm = ({ onSubmit, onCancel, connection }) => {
  const contact = connection?.contact;
  const { register, handleSubmit, control, errors, watch } = useForm({
    defaultValues: contact
      ? {
          first_name: contact?.first_name,
          last_name: contact?.last_name,
          relationship: contact?.relationship,
          sex: contact?.sex,
          race: contact?.race,
          city: contact?.city,
          birthday: contact?.birthday ? new Date(contact?.birthday) : null,
          zip: contact?.zip,
          disqualify_reason: connection?.disqualify_reason,
          placed_date: connection?.placed_date
            ? new Date(connection?.placed_date)
            : null,
        }
      : {},
  });
  const [pending, setPending] = useState(false);
  const [phonesList, setPhonesList] = useState([]);
  const [emailsList, setEmailsList] = useState([]);
  const [addressesList, setAddressesList] = useState([]);
  const [removeIds, setRemoveIds] = useState([]);
  const [currentPhone, setCurrentPhone] = useState("");
  const [isCurrentPhone, setIsCurrentPhone] = useState(false);
  const [currentEmail, setCurrentEmail] = useState("");
  const [isCurrentEmail, setIsCurrentEmail] = useState(false);
  const [currentAddress, setCurrentAddress] = useState("");
  const [isCurrentAddress, setIsCurrentAddress] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(
    connection?.is_confirmed || false
  );
  const [isVerifiedEmployment, setIsVerifiedEmployment] = useState(
    contact?.verified_employment || false
  );
  const [accessToTransportation, setAccessToTransportation] = useState(
    contact?.access_to_transportation || false
  );
  const [isDisqualified, setIsDisqualified] = useState(
    connection?.is_disqualified || false
  );
  const [isPlaced, setIsPlaced] = useState(connection?.is_placed || false);
  const relationship = watch("relationship"); // you can supply default value as second argument

  const onSubmitHandle = (data) => {
    setPending(true);

    const {
      state,
      relationship,
      sex,
      race,
      relationship_other,
      ...rest
    } = data;

    let submitData = rest;

    if (state?.value) {
      submitData.state = state.value;
    }
    if (relationship?.value) {
      submitData.relationship =
        relationship.value === "Other"
          ? relationship_other
          : relationship.value;
    }

    if (sex?.value) {
      submitData.sex = sex.value;
    }

    if (race?.value) {
      submitData.race = race.value;
    }

    submitData.is_confirmed = isConfirmed;
    submitData.access_to_transportation = accessToTransportation;
    submitData.verified_employment = isVerifiedEmployment;
    submitData.is_placed = isPlaced;
    submitData.is_disqualified = isDisqualified;

    console.log("inside: ", submitData);

    onSubmit(submitData, emailsList, phonesList, addressesList, removeIds);
  };

  return (
    <>
      <Form w="100%" onSubmit={handleSubmit(onSubmitHandle)} noValidate>
        <Spacing
          m={{ b: "15px" }}
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          <TextInput
            className="input"
            name={"first_name"}
            register={register({ required: true })}
            control={control}
            error={errors.first_name}
            label="First name"
          />
          <TextInput
            className="input"
            name={"last_name"}
            register={register({ required: false })}
            control={control}
            error={errors.last_name}
            label="Last name"
          />
          <SelectInput
            defaultValue={
              contact?.relationship &&
              getObjectByLabel(relationshipOptions, contact?.relationship)
            }
            name={"relationship"}
            register={{ required: false }}
            control={control}
            options={relationshipOptions}
            error={errors.relationship}
            label="Relationship"
            placeholder="Relationship"
          />
          <DatepickerInput
            name={"birthday"}
            register={{ required: false }}
            control={control}
            error={errors.birthday}
            label="Birthday"
            placeholder="Select birthday"
          />
          <SelectInput
            defaultValue={
              contact?.sex && getObjectByLabel(sex_options, contact.sex)
            }
            name="sex"
            control={control}
            error={errors.sex}
            label="Sex"
            options={sex_options}
          />
          <SelectInput
            defaultValue={
              contact?.race && getObjectByLabel(race_options, contact.race)
            }
            name="race"
            control={control}
            error={errors.race}
            label="Race"
            options={race_options}
          />
          <TextInput
            name={"city"}
            register={register({ required: false })}
            control={control}
            error={errors.city}
            label="City"
          />
          <SelectInput
            defaultValue={
              contact?.state && { label: contact?.state, value: contact?.state }
            }
            menuPlacement="top"
            name={"state"}
            register={{ required: false }}
            control={control}
            options={states.map((state) => ({ label: state, value: state }))}
            error={errors.state}
            label="State"
            placeholder="Choose State"
          />
          <TextInput
            width={210}
            name={"zip"}
            register={register({ required: false })}
            control={control}
            error={errors.zip}
            label="Zip"
          />

          <>
            <Box
              d="flex"
              justify="center"
              style={{ marginTop: 7, marginLeft: 10 }}
            >
              <div style={{ width: 200 }}>
                <Label htmlFor={"address"}>Address</Label>
                <Textfield
                  name="address"
                  value={currentAddress}
                  onChange={(e) => setCurrentAddress(e.target.value)}
                  elemAfterInput={
                    <Tooltip content="Is current address">
                      <Checkbox
                        isChecked={isCurrentAddress}
                        onChange={() => setIsCurrentAddress((item) => !item)}
                      />
                    </Tooltip>
                  }
                />
                <div style={{ marginBottom: 5 }} />
                {contact?.communications
                  ?.filter(
                    (item) =>
                      item.communication_type === "address" &&
                      !removeIds.includes(item.id)
                  )
                  .map((item) => (
                    <DynamicDataItem
                      filed={item.value}
                      isCurrent={item.is_current}
                      onClick={(e) => {
                        e.stopPropagation();
                        setRemoveIds([...removeIds, item.id]);
                      }}
                    />
                  ))}
                {addressesList.map((address, index) => (
                  <DynamicDataItem
                    filed={address.currentAddress}
                    isCurrent={address.isCurrentAddress}
                    onClick={(e) => {
                      e.stopPropagation();
                      setRemoveIds([...removeIds, address.id]);
                    }}
                  />
                ))}
              </div>
              <Button
                isDisabled={currentAddress?.length < 5}
                onClick={(e) => {
                  e.stopPropagation();
                  setAddressesList([
                    ...addressesList,
                    { currentAddress, isCurrentAddress },
                  ]);
                  setCurrentAddress("");
                  setIsCurrentAddress(false);
                }}
                appearance="primary"
                style={{
                  borderRadius: 20,
                  marginLeft: 5,
                  marginRight: 8,
                  marginTop: 25,
                }}
              >
                +
              </Button>
            </Box>

            <Box d="flex" justify="center">
              <div style={{ width: 200 }}>
                <Label htmlFor={"phone"}>Phone number</Label>
                <Textfield
                  name="phone"
                  value={currentPhone}
                  onChange={(e) => setCurrentPhone(e.target.value)}
                  elemAfterInput={
                    <Tooltip content="Is current phone">
                      <Checkbox
                        isChecked={isCurrentPhone}
                        onChange={() => setIsCurrentPhone((item) => !item)}
                      />
                    </Tooltip>
                  }
                />
                <div style={{ marginBottom: 5 }} />
                {contact?.communications
                  ?.filter(
                    (item) =>
                      item.communication_type === "phone" &&
                      !removeIds.includes(item.id)
                  )
                  .map((item) => (
                    <DynamicDataItem
                      filed={item.value}
                      isCurrent={item.is_current}
                      onClick={(e) => {
                        e.stopPropagation();
                        setRemoveIds([...removeIds, item.id]);
                      }}
                    />
                  ))}
                {phonesList.map((phone, index) => (
                  <DynamicDataItem
                    filed={phone.currentPhone}
                    isCurrent={phone.isCurrentPhone}
                    onClick={(e) => {
                      e.stopPropagation();
                      setRemoveIds([...removeIds, phone.id]);
                    }}
                  />
                ))}
              </div>
              <Button
                isDisabled={
                  !currentPhone.match(/\(?\d{3}\)?-? *\d{3}-? *-?\d{4}/)
                }
                onClick={(e) => {
                  e.stopPropagation();
                  setPhonesList([
                    ...phonesList,
                    { currentPhone, isCurrentPhone },
                  ]);
                  setCurrentPhone("");
                  setIsCurrentPhone(false);
                }}
                appearance="primary"
                style={{
                  borderRadius: 20,
                  marginLeft: 5,
                  marginRight: 8,
                  marginTop: 25,
                }}
              >
                +
              </Button>
            </Box>
            <div style={{ marginBottom: 5 }} />
            <Box
              d="flex"
              justify="center"
              style={{ marginTop: 7, marginLeft: 0 }}
            >
              <div style={{ width: 200 }}>
                <Label htmlFor={"email"}>Email</Label>
                <Textfield
                  value={currentEmail}
                  name="email"
                  onChange={(e) => setCurrentEmail(e.target.value)}
                  elemAfterInput={
                    <Tooltip content="Is current email">
                      <Checkbox
                        isChecked={isCurrentEmail}
                        onChange={() => setIsCurrentEmail((item) => !item)}
                      />
                    </Tooltip>
                  }
                />
                {contact?.communications
                  ?.filter(
                    (item) =>
                      item.communication_type === "email" &&
                      !removeIds.includes(item.id)
                  )
                  .map((item) => (
                    <DynamicDataItem
                      filed={item.value}
                      isCurrent={item.is_current}
                      onClick={(e) => {
                        e.stopPropagation();
                        setRemoveIds([...removeIds, item.id]);
                      }}
                    />
                  ))}
                {emailsList.map((email, index) => (
                  <DynamicDataItem
                    filed={email.currentEmail}
                    isCurrent={email.isCurrentEmail}
                    onClick={(e) => {
                      e.stopPropagation();
                      setRemoveIds([...removeIds, email.id]);
                    }}
                  />
                ))}
              </div>
              <Button
                isDisabled={
                  !currentEmail.match(
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                  )
                }
                onClick={(e) => {
                  e.stopPropagation();
                  setEmailsList([
                    ...emailsList,
                    { currentEmail, isCurrentEmail },
                  ]);
                  setCurrentEmail("");
                  setIsCurrentEmail(false);
                }}
                appearance="primary"
                style={{
                  borderRadius: 20,
                  marginLeft: 5,
                  marginRight: 8,
                  marginTop: 25,
                }}
              >
                +
              </Button>
            </Box>
          </>

          {relationship?.value === "Other" ? (
            <TextInput
              className="input"
              name={"relationship_other"}
              register={register({ required: false })}
              control={control}
              error={errors.relationship_other}
              label="Relationship name"
            />
          ) : (
            <div style={{ width: 240 }} />
          )}
        </Spacing>
        <div
          style={{
            marginBottom: 10,
            display: "flex",
            justifyContent: "space-evenly",
          }}
        >
          <Checkbox
            value="linked"
            label="Linked"
            isChecked={isConfirmed}
            onChange={() => setIsConfirmed((item) => !item)}
            style={{ width: "auto" }}
          />
          <Checkbox
            value="verified_employment"
            label="Verified Employment"
            isChecked={isVerifiedEmployment}
            onChange={() => setIsVerifiedEmployment((item) => !item)}
            style={{ width: "auto" }}
          />
          <Checkbox
            value="access_to_transportation"
            label="Has Access to Transportation"
            isChecked={accessToTransportation}
            onChange={() => setAccessToTransportation((item) => !item)}
            style={{ width: "auto" }}
          />
        </div>
        {connection && (
          <div
            style={{
              marginBottom: 10,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Checkbox
              value="disqualified"
              label="Disqualified"
              isChecked={isDisqualified}
              onChange={() => setIsDisqualified((item) => !item)}
              style={{ width: "auto" }}
            />
            <Checkbox
              value="placed"
              label="Placed"
              isChecked={isPlaced}
              onChange={() => setIsPlaced((item) => !item)}
              style={{ width: "auto" }}
            />
          </div>
        )}
        {isDisqualified && (
          <TextInput
            width="100%"
            name="disqualify_reason"
            register={register({ required: isDisqualified })}
            control={control}
            error={errors.disqualify_reason}
            label="Disqualify Reason"
          />
        )}
        {isPlaced && (
          <DatepickerInput
            name="placed_date"
            register={{ required: isPlaced }}
            control={control}
            error={errors.placed_date}
            label="Placed Date"
            placeholder="Select Date"
          />
        )}
        <Box d="flex" w="100%" justify="center" mb="40px" mt="20px">
          <ButtonGroup>
            <Button isDisabled={pending} type="submit" appearance="primary">
              Save
            </Button>
            <Button onClick={onCancel}>Cancel</Button>
          </ButtonGroup>
        </Box>
      </Form>
    </>
  );
};

const buttonStyle = {
  borderRadius: 30,
  padding: "3px 5px",
  marginTop: 10,
};

const CommunicationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 240px;

  div:first-child {
    width: 210px;
  }
  .communication-address {
    width: 210px;
    margin-block: 8px;
  }
`;
