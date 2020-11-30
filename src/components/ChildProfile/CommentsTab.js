import Avatar from "@atlaskit/avatar";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Box, Label, Rectangle, Spacing, Title } from "../ui/atoms";
import { TextInput } from "../ui/molecules";
import { useForm } from "react-hook-form";
import Comments from './Comments'
import InputTrigger from 'react-input-trigger';
import { fetchComments } from "../../context/children/childProvider";

function CommentsTab() {
  const { register, handleSubmit, control, errors, watch } = useForm();
  const [comments, setComments] = useState([]);
  useEffect(() => {
    let child_id = 1;
    fetchComments(child_id).then((items) => {
      if (items) setComments((items));
    });
  }, []);
  console.log("THIS IS COMMENTS SUKA!!!!!------>",comments)
  const data = [
    {
      "id": 1,
      "attachments": [],
      "body": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
      "in_reply_to": null,
      "replies": [
        {
            "id": 2,
            "attachments": [],
            "body": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
            "created_at": "2020-11-28T14:36:07.837+0000",
            "in_reply_to": {
                "id": 1,
                "body": "Body",
                "title": "Title",
                "user_id": 1
            },
            "replies": [],
            "title": "Title",
            "user": {
                "id": 1,
                "email": "murat",
                "first_name": "Shyngsys",
                "last_name": "Rakhad",
                "phone": "(504) 123 0000",
                "role": "super_admin"
            },
            "user_id": 1
        },
        {
          "id": 2,
          "attachments": [],
          "body": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
          "in_reply_to": {
              "id": 1,
              "body": "Body",
              "title": "Title",
              "user_id": 1
          },
          "replies": [{
            "id": 2,
            "attachments": [],
            "body": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
            "created_at": "2020-11-28T14:36:07.837+0000",
            "in_reply_to": {
                "id": 1,
                "body": "Body",
                "title": "Title",
                "user_id": 1
            },
            "replies": [],
            "title": "Title",
            "user": {
                "id": 1,
                "email": "murat",
                "first_name": "Bekzat",
                "last_name": "Makhanbet",
                "phone": "(504) 123 0000",
                "role": "super_admin"
            },
            "user_id": 1
        }],
          "title": "Title",
          "user": {
              "id": 1,
              "email": "murat",
              "first_name": "Murat",
              "last_name": "Tishkul",
              "phone": "(504) 123 0000",
              "role": "super_admin"
          },
          "user_id": 1
      }
    ],
      "title": "Title",
      "user_id": 1,
      "user": {
        "id": 1,
        "email": "murat",
        "first_name": "Shyngsys",
        "last_name": "Rakhad",
        "phone": "(504) 123 0000",
        "role": "super_admin"
      },
    }
  ]

  const [st, setSt] = useState({
    top: null,
    left: null,
    showSuggestor: false,
    startPosition: null,
    users: [
      'Charmander',
      'Squirtle',
      'Bulbasaur',
      'Pikachu'
    ],
    text: null,
    currentSelection: 0,
    textareaValue:''
  })
  console.table(st)


  const toggleSuggestor = (metaInformation) => {
    const { hookType, cursor } = metaInformation;

    if (hookType === 'start') {
      setSt({   
        users: st.users,
        text: st.text,
        currentSelection: st.currentSelection,
        showSuggestor: true,
        left: cursor.left,
        top: cursor.top + cursor.height, // we need to add the cursor height so that the dropdown doesn't overlap with the `@`.
        startPosition: cursor.selectionStart,
        textareaValue: st.textareaValue, 
      });
    }
    
    if (hookType === 'cancel') {
      // reset the state

      setSt({
        users: st.users,
        showSuggestor: false,
        left: null,
        top: null,
        text: null,
        startPosition: null,
        currentSelection: st.currentSelection,
        textareaValue: st.textareaValue, 
      });
    }
  }
  const handleInput = (metaInformation) => {
    setSt({
      text: metaInformation.text,
      showSuggestor: st.showSuggestor,
      left: st.left,
      top: st.top,
      startPosition: st.startPosition,
      users: st.users,
      textareaValue: st.textareaValue, 
      currentSelection: st.currentSelection,
    });
  }
  const handleKeyDown = (event) => {
    const { which } = event;
    const { currentSelection, users } = st;
    
    if (which === 40 ) { // 40 is the character code of the down arrow
      event.preventDefault();
      
      setSt({
      showSuggestor: st.showSuggestor,
      left: st.left,
      top: st.top,
      text: st.text,
      startPosition: st.startPosition,
      users: st.users,
      textareaValue: st.textareaValue, 
      currentSelection: (currentSelection + 1) % users.length,
      });
    }
    
    if (which === 13) { // 13 is the character code for enter
      event.preventDefault();
      
      const { users, currentSelection, startPosition, textareaValue } = st;
      const user = users[currentSelection];
      
      const newText = `${textareaValue.slice(0, startPosition - 1)}${user}${textareaValue.slice(startPosition + user.length, textareaValue.length)}`
      
      // reset the state and set new text

      setSt({
        showSuggestor: false,
        left: null,
        top: null,
        text: null,
        startPosition: null,
        textareaValue: newText,
        users: st.users,
        currentSelection: st.currentSelection
      });
      
      endHandler();
    }
  }
  const handleTextareaInput = (event) => {
    const { value } = event.target;
    
    setSt({
      showSuggestor: st.showSuggestor,
      left: st.left,
      top: st.top,
      text: st.text,
      startPosition: st.startPosition,
      users: st.users,
      currentSelection: st.currentSelection,
      textareaValue: value,   
    })
  }

  const endHandler = ()=>{}
  return (
    <Spacing m={{ t: "22px" }}>
      <Box d="flex">
        <Avatar
          appearance="circle"
          src="https://pbs.twimg.com/profile_images/803832195970433027/aaoG6PJI_400x400.jpg"
          size="large"
        />
        <Spacing m={{ l: "17px" }}>
        <div
        style={{
          position: 'relative'        
        }}
        
        onKeyDown={handleKeyDown}
      >
          <InputTrigger
            trigger={{
              keyCode: 50,
              shiftKey: true,
            }}
            onStart={(metaData) => { toggleSuggestor(metaData); }}
            onCancel={(metaData) => { toggleSuggestor(metaData); }}
            onType={(metaData) => { handleInput(metaData); }}
            endTrigger={(endHandler) => { endHandler = endHandler; }}
          >
          <textarea 
            name="Comments"
            placeholder = "Join the discussion"
            value={st.textareaValue}
            onChange={handleTextareaInput}
            />
          </InputTrigger>
          <div
            id="dropdown"
            style={{
              position: "absolute",
              width: "200px",
              borderRadius: "6px",
              background: "white",
              boxShadow: "rgba(0, 0, 0, 0.4) 0px 1px 4px",

              display: st.showSuggestor ? "block" : "none",
              top: st.top,
              left: st.left,
            }} >
              {
                st.users
                  .filter(user => user.indexOf(st.text) !== -1)
                  .map((user, index) => (
                    <div
                      style={{
                        padding: '10px 20px',
                        background: index === st.currentSelection ? '#eee' : ''
                      }}
                    >
                      { user }
                    </div>
                  ))  
              }
            </div></div>
        </Spacing>
      </Box>
      <Spacing m={{ t: "22px"}}>
        { data.map ( comment => <Comments data={comment}/> )}
      </Spacing>
    </Spacing>
  )
}

export default CommentsTab
