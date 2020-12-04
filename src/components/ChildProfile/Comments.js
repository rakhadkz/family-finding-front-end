import Avatar from "@atlaskit/avatar";
import React, { useState, useRef } from "react";
import styled from "styled-components";
import { Box, Spacing, Title } from "../ui/atoms";
import Button from "@atlaskit/button";
import CommentsForm from './CommentsForm';
import {useClickOutside} from '../../hooks/index'

const Comments = ({data}) => {  
  const [showInput, setShowInput] = useState(false);
  const replyRef = useRef();
  const outsideClick = useClickOutside(
    [replyRef],
    showInput,
    ()=>{setShowInput(false);console.log('closed');},
  );
  return (
    <Spacing m={{t:"17px"}}>
    <Box d="flex" justify="space-between">
      <Avatar
        appearance="circle"
        src="https://pbs.twimg.com/profile_images/803832195970433027/aaoG6PJI_400x400.jpg"
        size="large"
        />
      <Spacing m={{ l: "7px" }}>
        <Title size="14px">{`${data.user.first_name} ${data.user.last_name}`}</Title>
        <Text>{data.body}</Text>
        <Box ref={replyRef}>
        {showInput ? 
        <Spacing m={{ t: "-22px" }}>
          <CommentsForm />
        </Spacing> :
        <Button appearance="link" onClick={()=>{setShowInput(true)}} style={{  "padding" : "0px"}}>
          <ButtonContentWrapper>
          Reply
          </ButtonContentWrapper>
        </Button> 
        }
        </Box>
        {data.replies.map(reply => <Comments data={reply} />)}
      </Spacing>  
    </Box>
    </Spacing>
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
