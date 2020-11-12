import Button from "@atlaskit/button";
import { useState } from "react";
import styled from "styled-components";
import { Label, Spacing } from "../ui/atoms";

export const SelectOrganizationLogo = ({ onClick, control, register, setLogoUrl }) => {
  const [logo, setLogo] = useState();
  return (
    <Container>
      <Label style={{ display: "block" }}>Logo</Label>
      {logo && (
        <Spacing m={{ t: "8px", b: "12px" }}>
          <LogoPreview style={{ display: "block" }} src={logo} alt="logo" />
        </Spacing>
      )}
      <Button onClick={onClick}>
        <ButtonContentWrapper>Upload Logo</ButtonContentWrapper>
        <InvisibleFileInput
          type="file"
          name="logo"
          onChange={({ target }) =>{
            const url = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`;
            const formData = new FormData();
            formData.append('file', target.files[0]);
            formData.append("upload_preset", `${process.env.REACT_APP_CLOUDINARY_PRESET}`);
            window.fetch(url, {
              method: "post",
              body: formData
            })
            .then(res => res.json())
            .then(payload => {
                // console.log(payload)
                setLogoUrl(payload.public_id)
            })
            .catch(err => {
                console.log(err)
            })
            setLogo(URL.createObjectURL(target.files[0]))
            }
          }
          accept="image/*"
          control={control}
          ref={register}
          style={{
            opacity: 0,
            width: 100,
            position: "absolute",
            top: 0,
            left: 0,
          }}
        />
      </Button>
    </Container>
  );
};

const LogoPreview = styled.img`
  max-height: 200px;
  max-width: 200px;
`;

const Container = styled.div`
  margin-top: 18px;
`;

const ButtonContentWrapper = styled.div`
  font-family: Helvetica;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
`;

const InvisibleFileInput = styled.input`
  opacity: 0;
  width: 100px;
  position: absolute;
  top: 0;
  left: 0;
`;
