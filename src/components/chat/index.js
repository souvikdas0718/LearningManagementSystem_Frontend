import React, { useState, useEffect, useContext } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import axios from "axios";

function Chat(props) {
  const [topic, setTopic] = useState("");
  const [onlineUsers, setOnlineUser] = useState([]);
  const [submitTopic, setSubmitTopic] = useState(false);
  const [disable, setDisable] = useState(true);
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    if (topic.trim().length >= 3) {
      setDisable(false);
      setHidden(true);
    } else {
      setDisable(true);
      setHidden(false);
    }
  }, [topic]);

  const handleSubmitTopic = () => {
    const email = localStorage.getItem("email");

    axios({
      url:
        "https://do3vuuv41l.execute-api.us-east-1.amazonaws.com/login/online",
      method: "GET",
    })
      .then((res) => {
        // const temp = res.data["message"];
        const onlineUser = res.data.online
        console.log("IN SUCCESS");
        console.log(onlineUser);
        console.log(typeof(onlineUser));
        axios({
          url:
            "https://us-central1-serverless-project-283717.cloudfunctions.net/createTopic",
          method: "POST",
          data: {
            topic_name: topic,
            userID: [...onlineUser],
            uniqueFileName: topic,
          }
        })
          .then((res) => {
            console.log("IN SUCCESS");
            console.log(res);
            localStorage.setItem('online', JSON.stringify(onlineUser));
            localStorage.setItem('topic', topic);
            props.history.push('/chatmain')
          })
          .catch(({ response }) => {
            console.log("IN SUCCESS1");
            console.log(response);
          });
      })
      .catch(({ response }) => {
        console.log("IN ERROR");
        console.log(response);
      });
  };

  return (
    <Container className={"mt-5 p-0"}>
      <Form.Group>
        <Form.Label>Topic Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter topic name"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />
      </Form.Group>
      <Alert variant="danger" hidden={hidden}>
        Enter Valid Topic
      </Alert>
      <Button variant="success" onClick={handleSubmitTopic} disabled={disable}>
        Create
      </Button>
    </Container>
  );
}

export default Chat;
