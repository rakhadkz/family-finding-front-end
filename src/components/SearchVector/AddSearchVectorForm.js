import Button from "@atlaskit/button";
import { FormSection } from "@atlaskit/form";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { inContinuousSearchOptions } from "../../content/searchVector.data";
import { states } from "../../content/states.data";
import { Box, Form, Spacing, Label } from "../ui/atoms";
import { DatepickerInput, SelectInput, TextInput } from "../ui/molecules";
import { toast } from "react-toastify";
import { WysiwygEditor } from "../WYSIWYG";

export const AddSearchVectorForm = ({
  onSubmit,
  onCancel,
  initialValues = {},
  organization_id,
  fetch,
  currSv,
  sv,
  isEdit,
  onEdit,
  something,
}) => {
  const { register, handleSubmit, control, errors, watch } = useForm({
    defaultValues: initialValues,
  });
  const [pending, setPending] = useState(false);
  const [upd, setUpd] = useState(1);
  const [text, setText] = useState("");
  const [htmlText, setHtmlText] = useState("");
  const [rawData, setRawData] = useState("");
  const relationship = watch("relationship"); // you can supply default value as second argument

  const onSubmitHandle = (data) => {
    setPending(true);
    data.in_continuous_search = data.in_continuous_search?.value;
    data.organization_id = organization_id;
    data.description = htmlText;

    isEdit
      ? something({ data, id: currSv })
          .then((res) => {
            console.log(res);
            toast.success("Search Vector was successfully created!", {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          })
          .finally(() => {
            setPending(false);
            onCancel();
            fetch();
          })
      : onSubmit(data)
          .then((res) => {
            console.log(res);
            toast.success("Search Vector was successfully created!", {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          })
          .finally(() => {
            setPending(false);
            onCancel();
            fetch();
          });
  };
  console.log(currSv, sv);
  return (
    <>
      <Form w="100%" onSubmit={handleSubmit(onSubmitHandle)} noValidate>
        <FormSection>
          <Spacing
            m={{ t: "-10px", b: "30px" }}
            style={{
              display: "flex",
              flexWrap: "wrap",
              rowGap: 20,
              justifyContent: "flex-end",
              flexDirection: "column",
              // alignItems: "center",
            }}
          >
            <TextInput
              className="input"
              name={"name"}
              register={register({ required: true })}
              control={control}
              error={errors.first_name}
              label="Name"
            />
            {/* <TextInput
              className="input"
              name={"description"}
              register={register({ required: false })}
              control={control}
              error={errors.last_name}
              label="Description"
            /> */}
            <div>
              <Spacing m={{ b: "-10px" }}>
                <Label>Description</Label>
              </Spacing>
              <div style={{ marginLeft: "-10px" }}>
                <WysiwygEditor
                  upd={upd}
                  withMention={false}
                  // defaultValue={
                  //   // currSv !== -1
                  //   //   ? sv.find((s) => s.id === currSv)?.cells[1].content.props
                  //   //       .children
                  //   //   : undefined
                  // }
                  onChange={(tex, raw, html) => {
                    setText(tex);
                    setRawData(raw);
                    setHtmlText(html);
                  }}
                />
              </div>
            </div>
            {/* in_continuous_search */}
            <SelectInput
              name={"in_continuous_search"}
              register={{ required: false }}
              control={control}
              options={inContinuousSearchOptions}
              error={errors.in_continuous_search}
              label="In Continuous Search"
              placeholder="In Continuous Search"
            />
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
              <div style={{ width: 275, height: 50 }} />
            )}
            <Spacing m={{ r: "30px", t: "-30px" }}>
              <Box d="flex">
                <Button isDisabled={pending} type="submit" appearance="primary">
                  Save
                </Button>
                <Spacing m={{ l: "5px", r: "5px" }} />
                <Button onClick={onCancel}>Cancel</Button>
              </Box>
            </Spacing>
          </Spacing>
        </FormSection>
      </Form>
    </>
  );
};
