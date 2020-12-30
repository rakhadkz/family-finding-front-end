import Avatar from "@atlaskit/avatar";
import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { Box, Spacing, Title } from "../ui/atoms";
import Button from "@atlaskit/button";
import { CommentsForm } from './CommentsForm';
import {useClickOutside} from '../../hooks/index'
import { postCommentRequest } from '../../api/comments'

export const Comments = ({data, shouldUpdate, increaseShouldUpdate, id, mentions}) => {  
  const [showInput, setShowInput] = useState(false);
  const [body, setBody] = useState(null)
  const replyRef = useRef();

  useEffect( () => {
    let comment = data.body;
    let ij = [];
    if(comment){ 
      for(let i=0;i<comment.length;i++){ // iterate through comment body
        if( comment[i] == '@' && (i==0 || comment[i-1]==' ') ){ // if find mentions
          let j, s  = 0;
          for(j=1;j+i<comment.length && s!=2;j++){ // find last index of mention
            if(comment[i+j]==' ') s++;
          }
          ij.push([i,i+j])
        }
      }
    } 
    let res = [];
    let last = 0;
    if(ij.length>0){
      for(let i=0;i<ij.length;i++){
        res.push(comment.substring(last, ij[i][0]));
        res.push(`<span style="
        cursor:pointer;
        color:#0052CC;
        text-decoration:none;
        font:14px Helvetica;
        span:hover {text-decoration:underline;};
      ">
          ${comment.substring(ij[i][0], ij[i][1])}
        </span>`)
        // res.push(<MentionedUser>{comment.substring(ij[i][0], ij[i][1])}</MentionedUser>);
        last = ij[i][1];
      }
      comment = ''
      res.forEach(item => comment+=item)
      // comment = res;
    }
    // comment = comment.join()
    console.log("THIS IS COMMENT",comment)
    setBody(comment)
  },[])
  console.log(body)
  return (
    <Spacing m={{t:"17px"}}>
      <Box d="flex">
        <Avatar
          appearance="circle"
          src="https://pbs.twimg.com/profile_images/803832195970433027/aaoG6PJI_400x400.jpg"
          size="large"
          />
        <Spacing m={{ l: "7px" }}>
          <Title size="14px">{`${data.user.first_name} ${data.user.last_name}`}</Title>
          <Text dangerouslySetInnerHTML={{ __html: body}}></Text>
            {showInput ? 
            <Spacing ref={replyRef} m={{ t: "-22px" }}>
              <CommentsForm 
                shouldUpdate={shouldUpdate} 
                increaseShouldUpdate={increaseShouldUpdate} 
                id={id} 
                inReply={data.id} 
                onSubmit={postCommentRequest}
                setShowInput={setShowInput}
                mentions={mentions}
              />
            </Spacing> :
            <Button ref={replyRef} appearance="link" onClick={()=>{setShowInput(true)}} style={{  "padding" : "0px"}}>
              <ButtonContentWrapper>
              Reply
              </ButtonContentWrapper>
            </Button> 
          }
          {data.replies.map(reply => <Comments data={reply} shouldUpdate={shouldUpdate} 
              increaseShouldUpdate={increaseShouldUpdate} id={id}/>)}
        </Spacing>  
      </Box>
    </Spacing>
  )
};

const MentionedUser = styled.span`
    cursor:pointer;
    color:	#0052CC;
    text-decoration:none;
    font: 14px Helvetica;
    &:hover { 
      text-decoration:underline;
    }
`;

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

