import Button, { ButtonGroup } from "@atlaskit/button";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { inContinuousSearchOptions } from "../../content/searchVector.data";
import { Box, Form, Label } from "../ui/atoms";
import { SelectInput, TextInput } from "../ui/molecules";
import { WysiwygEditor } from "../WYSIWYG";

export const AddSearchVectorForm = ({
  onSubmit,
  onCancel,
  currentSearchVector,
  pending,
}) => {
  const { register, handleSubmit, control, errors } = useForm({
    defaultValues: currentSearchVector
      ? {
          ...currentSearchVector,
          in_continuous_search: currentSearchVector.in_continuous_search
            ? inContinuousSearchOptions[0]
            : inContinuousSearchOptions[1],
        }
      : { name: "", in_continuous_search: null },
  });
  const [htmlText, setHtmlText] = useState("");
  //const relationship = watch("relationship"); // you can supply default value as second argument

  const onSubmitHandle = (data) => {
    data.in_continuous_search = data.in_continuous_search?.value;
    data.description = htmlText;
    onSubmit(data);
  };

  return (
    <>
      <Form w="100%" onSubmit={handleSubmit(onSubmitHandle)} noValidate>
        <Box d="block" mb="20px">
          <TextInput
            marginY="16px"
            className="input"
            name={"name"}
            register={register({ required: true })}
            control={control}
            error={errors.first_name}
            label="Name"
          />
          <Label>Description</Label>
          <WysiwygEditor
            withMention={false}
            onChange={(text, raw, html) => setHtmlText(html)}
            defaultValue={currentSearchVector?.description}
          />
          <SelectInput
            menuPlacement="top"
            marginY="16px"
            defaultValue={
              currentSearchVector
                ? currentSearchVector.in_continuous_search
                  ? inContinuousSearchOptions[0]
                  : inContinuousSearchOptions[1]
                : null
            }
            name={"in_continuous_search"}
            register={{ required: false }}
            control={control}
            options={inContinuousSearchOptions}
            error={errors.in_continuous_search}
            label="In Continuous Search"
            placeholder="In Continuous Search"
          />
          {/* {relationship?.value === "Other" && (
            <TextInput
              marginY="16px"
              className="input"
              name={"relationship_other"}
              register={register({ required: false })}
              control={control}
              error={errors.relationship_other}
              label="Relationship name"
            />
          )} */}
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
