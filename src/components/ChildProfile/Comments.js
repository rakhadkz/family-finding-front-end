import Avatar from "@atlaskit/avatar";
import React from "react";
import styled from "styled-components";
import { Box, Spacing, Title } from "../ui/atoms";
import Button from "@atlaskit/button";


const Comments = ({data}) => {  
  return (
    <Box d="flex" justify="space-between">
      <Avatar
        appearance="circle"
        src="https://pbs.twimg.com/profile_images/803832195970433027/aaoG6PJI_400x400.jpg"
        size="large"
        />
      <Spacing m={{ l: "17px" }}>
        <Title size="14px">{`${data.user.first_name} ${data.user.last_name}`}</Title>
        <Text>{data.body}</Text>
        <Button appearance="link" onClick={()=>{}} style={{  "padding" : "0px"}}>
          <ButtonContentWrapper>
          Reply
          </ButtonContentWrapper>
        </Button>
        {data.replies.map(reply => <Comments data={reply} />)}
      </Spacing>  
    </Box>
  )
}

const ButtonContentWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-family: Helvetica;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  `;

const Text = styled.div`
  font-family: Helvetica;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;

  color: #172b4d;
`;

export default Comments
