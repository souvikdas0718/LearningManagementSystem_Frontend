import React from "react";
import {
  Alert,
  Form
} from "react-bootstrap";

function OtherChat({ message, time }) {

  return (
    <Form.Group>
      <Alert variant={"success"} className="mb-0">
        {message}
      </Alert>
      <Form.Text className="mt-0" className="justify-content-md-end">
        {time}
      </Form.Text>
    </Form.Group>
  );
}

export default OtherChat;
