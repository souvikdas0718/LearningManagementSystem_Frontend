import React, { useState, useEffect } from "react";
import { Form, Button, Col, Container, Alert } from "react-bootstrap";

import axios from "axios";

const initialData = {
  name: "",
  email: "",
  password: "",
  re_password: "",
  role: "",
  instituteName: "",
  question: "",
  answer: "",
};

function SignUp() {
  const [formData, setFormData] = useState(initialData);
  const [message, setMessage] = useState({ success: "", fail: "" });

  const handleSubmit = () => {
    console.clear();
    const URI = process.env.REACT_APP_REGISTER_URL;
    console.log(URI);
    axios({
      url: URI,
      method: "POST",
      data: formData,
    })
      .then((res) => {
        console.log(res);
        console.log(res.data);
        setMessage({success:"Success: User registration success!", fail:""})
      })
      .catch(({ response }) => {
        console.log(response);
        if (response.status ===409) {
          setMessage({success:"", fail:"Error: User with email already exist!"})
        }
        else if (response.status >= 400 && response.status < 500) {
          setMessage({success:"", fail:"Error: Enter Valid Data!"})
        }
        else {
          setMessage({success:"", fail:"Error: Some internal error occurred!"})
        }
      });
  };

  const handleClear = () => {
    setFormData(initialData);
  };

  return (
    <Container className={"mt-5"}>
      <Form.Row>
        <Form.Group controlId="formBasicEmail" as={Col}>
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            type="text"
            value={formData.name}
            placeholder="Enter full name"
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </Form.Group>
        <Form.Group controlId="formBasicEmail" as={Col}>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            value={formData.email}
            placeholder="Enter email"
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Form.Group controlId="formBasicPassword" as={Col}>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={formData.password}
            placeholder="Password"
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
        </Form.Group>
        <Form.Group controlId="formBasicPassword" as={Col}>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            value={formData.re_password}
            placeholder="Confirm password"
            onChange={(e) =>
              setFormData({ ...formData, re_password: e.target.value })
            }
          />
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Form.Group controlId="formBasicEmail" as={Col}>
          <Form.Label>Role</Form.Label>
          <Form.Control
            type="text"
            value={formData.role}
            placeholder="Enter your role"
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          />
        </Form.Group>
        <Form.Group controlId="formBasicPassword" as={Col}>
          <Form.Label>InstituteName Name</Form.Label>
          <Form.Control
            type="text"
            value={formData.instituteName}
            placeholder="Enter your institute name"
            onChange={(e) =>
              setFormData({ ...formData, instituteName: e.target.value })
            }
          />
        </Form.Group>
      </Form.Row>
      <Form.Group controlId="exampleForm.ControlSelect1">
        <Form.Label>Security Question</Form.Label>
        <Form.Control
          as="select"
          onChange={(e) =>
            setFormData({ ...formData, question: e.target.value })
          }
        >
          <option>None</option>
          <option>What is your father's name?</option>
          <option>What is your mother's name?</option>
          <option>What is your childhood name?</option>
        </Form.Control>
      </Form.Group>
      <Form.Group controlId="formBasicPassword">
        <Form.Label>Answer</Form.Label>
        <Form.Control
          type="text"
          value={formData.answer}
          placeholder="Enter your answer"
          onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
        />
        {message["success"] !== "" ? (
          <Alert variant={"success"} className={"mt-3 p-1"}>
            {message['success']}
          </Alert>
        ) : message["fail"] !== "" ? (
          <Alert variant={"danger"} className={"mt-3 p-1"}>
            {message['fail']}
          </Alert>
        ) : (
          ""
        )}
      </Form.Group>
      <Form.Row>
        <Button variant="secondary" type="submit" onClick={handleClear}>
          Clear
        </Button>
        <Button
          variant="warning"
          type="submit"
          onClick={handleSubmit}
          className={"ml-5"}
        >
          Register
        </Button>
      </Form.Row>
    </Container>
  );
}

export default SignUp;
