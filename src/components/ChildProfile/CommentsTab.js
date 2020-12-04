import Avatar from "@atlaskit/avatar";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Box, Form, Label, Rectangle, Spacing, Title } from "../ui/atoms";
import { MentionInput } from "../ui/molecules";
import { useForm } from "react-hook-form";
import Comments from './Comments'
import { fetchComments } from "../../context/children/childProvider";
import { FormSection } from "@atlaskit/form";
import { useHistory } from "react-router-dom";
import CommentsForm from './CommentsForm'

function CommentsTab() {
  const history = useHistory();
  const { register, handleSubmit, control, errors } = useForm();
  const [comments, setComments] = useState([]);

  useEffect(() => {
    let child_id = 1;
    fetchComments(child_id).then((items) => {
      if (items) setComments((items));
    });
  }, []);

  const onSubmit=()=>{}

  const onSubmitHandle = (data) => {
    // setPending(true);
    // console.log(data);
    onSubmit(data)
      // .then(() => {
        // toast.success("User successfully created!", {
        //   position: "top-center",
        //   autoClose: 2000,
        //   hideProgressBar: true,
        //   closeOnClick: true,
        //   pauseOnHover: true,
        //   draggable: true,
        //   progress: undefined,
        // });
        // history.goBack();
      // })
      // .finally(() => setPending(false));
  };

  return (
    <Spacing m={{ t: "22px" }}>
      <Box d="flex">
        <Avatar
          appearance="circle"
          src="https://pbs.twimg.com/profile_images/803832195970433027/aaoG6PJI_400x400.jpg"
          size="large"
        />
        <Spacing m={{ l: "17px", t: "-22px" }}>
          <CommentsForm />
        </Spacing>
      </Box>
      <Spacing m={{ t: "22px"}}>
        { data.map ( comment => <Comments data={comment}/> )}
      </Spacing>
    </Spacing>
  )
}

export default CommentsTab

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