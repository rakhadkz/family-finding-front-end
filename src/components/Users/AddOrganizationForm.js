import Button from "@atlaskit/button";
import { FormSection } from "@atlaskit/form";
import SearchIcon from "@atlaskit/icon/glyph/search";
import React, { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { fetchOrganizations } from "../../context/organization/organizationProvider";
import { Box, Form, Spacing } from "../ui/atoms";
import { SelectInput } from "../ui/molecules";
import CrossIcon from "@atlaskit/icon/glyph/cross";
import "@atlaskit/css-reset";

export const AddOrganizationForm = ({ setOrgRoles }) => {
  const { register, handleSubmit, control, errors } = useForm();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "user_organizations",
  });

  const [organizations, setOrganizations] = useState([]);

  const onAddOrganizationHandle = (data) => {
    fields.map(
      (item, index) =>
        item.organization.value === data.organization.value && remove(index)
    );
    append({
      organization: {
        label: data.organization?.label,
        value: data.organization?.value,
      },
      role: {
        label: data.role?.label,
        value: data.role?.value,
      },
    });
  };

  useEffect(() => {
    fetchOrganizations("short").then((items) => {
      var options = items.map(function (item) {
        return {
          label: item.name,
          value: item.id,
        };
      });
      setOrganizations(options);
    });
  }, []);

  useEffect(() => {
    setOrgRoles(
      fields.map((item) => ({
        organization_id: item.organization.value,
        role: item.role.value,
      }))
    );
  }, [fields]);

  return (
    <>
      <Form
        w="100%"
        onSubmit={handleSubmit(onAddOrganizationHandle)}
        noValidate
      >
        <FormSection>
          <Spacing m={{ t: "33px" }}>
            <Box align="flex-end" d="flex" w="70%" justify="space-between">
              <SelectInput
                name="organization"
                elemAfterInput={<SearchIcon />}
                options={organizations}
                ref={register({ required: true })}
                control={control}
                error={errors.organization}
                label="Organization"
                placeholder="Choose organization"
              />
              <SelectInput
                name="role"
                label="Role"
                options={options}
                register={{ required: true }}
                control={control}
                error={errors.role}
                placeholder="Select a role"
              />
              <Button type="submit" appearance="primary">
                Add Organization
              </Button>
            </Box>
          </Spacing>
        </FormSection>
      </Form>
      <Spacing m={{ t: "33px" }}>
        <table>
          <thead>
            <tr>
              <th>Organization</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {fields.map((item, index) => {
              return (
                <tr key={item.organization.value}>
                  <td>{item.organization.label}</td>
                  <td>{item.role.label}</td>
                  <td>
                    <Button onClick={() => remove(index)}>
                      <CrossIcon />
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Spacing>
    </>
  );
};

const options = [
  { label: "Super admin", value: "super_admin" },
  { label: "Organization admin", value: "admin" },
  { label: "Organization manager", value: "manager" },
  { label: "Organization user", value: "user" },
];
