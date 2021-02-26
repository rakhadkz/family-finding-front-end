import Button from "@atlaskit/button";
import Select from "@atlaskit/select";
import Textfield from "@atlaskit/textfield";
import React, { useEffect, useState } from "react";
import { fetchPhoneNumbers } from "../../api/settings";
import { Box, Label, Spacing } from "../ui/atoms";
import { ModalDialog } from "../ui/common";

function PhoneSettings() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [numbers, setNumbers] = useState([]);

  useEffect(() => {
    if (isModalOpen) {
      fetchNumbers();
    }
  });

  const fetchNumbers = () => {
    fetchPhoneNumbers().then(setNumbers);
  };

  return (
    <div>
      <Spacing m="30px 10px">
        <Box d="flex">
          <Box>
            <Label htmlFor={"phone"}>Your current phone</Label>
            <Textfield
              style={{ width: 350 }}
              disabled={true}
              name={"phone"}
              value={`+13238706031`}
            />
          </Box>

          <Spacing m="23px 10px">
            <Button
              size="large"
              style={{
                height: 40,
                alignItems: "center",
                justifyContent: "center",
              }}
              onClick={() => setIsModalOpen(true)}
              appearance="primary"
            >
              Change
            </Button>
          </Spacing>
        </Box>
        <ModalDialog
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
          onClick={() => setIsModalOpen(false)}
          heading="Change the phone number"
          positiveLabel="Select"
          width="small"
          body={
            <>
              <Select
                className="multi-select"
                classNamePrefix="react-select"
                isMulti
                menuPortalTarget={document.body}
                styles={{
                  menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                }}
                options={numbers?.map((item) => ({
                  value: item.phone_number,
                  label: item.friendly_name,
                }))}
                placeholder="Choose a phone number"
              />
            </>
          }
        />
      </Spacing>
    </div>
  );
}

export default PhoneSettings;
