import React from "react";
import {
  Alert,
  Form
} from "react-bootstrap";

function UserChat(props) {
  console.log('IN HERE');
  return (
    <Form.Group>
      <Alert variant={"success"} className="mb-0">
        {props.message}
      </Alert>
      <Form.Text className="mt-0" className="justify-content-start">
        {props.username}
      </Form.Text>
    </Form.Group>
  );
}

export default UserChat;
