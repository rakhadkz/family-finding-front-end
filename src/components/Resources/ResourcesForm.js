import { FormSection } from "@atlaskit/form";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Box, Form, Spacing } from "../ui/atoms";
import { TextInput } from "../ui/molecules";

export const ResourcesForm = React.forwardRef(
  (
    {
      onSubmit,
      isUpdate = false,
      initialValues = {},
      setRefresh,
      setIsOpenEdit,
      refresh,
    },
    ref
  ) => {
    const { register, handleSubmit, control, errors } = useForm({
      defaultValues: initialValues,
    });

    const onSubmitHandle = (data) => {
      const requestData = {
        name: data.name,
        link: data.link,
      };
      onSubmit({ resource: requestData }).then(() => {
        toast.success(
          `Resource successfully ${isUpdate ? "updated" : "created"}!`
        );
        setRefresh(!refresh);
        setIsOpenEdit(false);
      });
    };

    return (
      <>
        <Form
          ref={ref}
          w="100%"
          onSubmit={handleSubmit(onSubmitHandle)}
          noValidate
        >
          <FormSection>
            <Box d="flex">
              <Spacing m={{ t: "18px", l: "10px" }}>
                <TextInput
                  className="input"
                  name={"name"}
                  register={register({ required: true })}
                  control={control}
                  error={errors.name}
                  label="Name of resource"
                />
              </Spacing>
              <Spacing m={{ t: "18px", l: "10px" }}>
                <TextInput
                  className="input"
                  name={"link"}
                  register={register({ required: true })}
                  control={control}
                  error={errors.link}
                  label="Link of resource"
                />
              </Spacing>
            </Box>
          </FormSection>
        </Form>
      </>
    );
  }
);
