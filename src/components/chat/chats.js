import React, {useEffect, useState} from "react";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import axios from "axios";
import UserChat from "./userText";
import "./index.css";

function Chats(props) {
    const [online, setOnline] = useState([]);
    const [topic, setTopic] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [chat, setChat] = useState([]);

    useEffect(() => {
        setOnline(JSON.parse(localStorage.getItem("online")));
        setTopic(localStorage.getItem("topic"));
        setEmail(localStorage.getItem("email"));
    }, []);

    const handleSubmit = () => {
        axios({
            url:
                "https://us-central1-serverless-project-283717.cloudfunctions.net/publishMessage",
            method: "POST",
            data: {
                topic_name: topic,
                username: email,
                message: message,
            },
        })
            .then((res) => {
                console.log("IN SUCCESS");
                console.log(res);
                setMessage("");
            })
            .catch((error) => {
                console.log("IN ERROR");
                console.log(error);
            });
    };
    useEffect(() => {
        axios({
            url:
                "https://do3vuuv41l.execute-api.us-east-1.amazonaws.com/login/online",
            method: "GET",
        })
            .then((res) => {
                // const temp = res.data["message"];
                const onlineUser = res.data.online;
                localStorage.setItem("online", JSON.stringify(onlineUser));
                localStorage.setItem("topic", "Process");
            })
            .catch(({response}) => {
                console.log("IN ERROR");
                console.log(response);
            });
    }, []);

    useEffect(() => {
        setTimeout(() => {
            axios({
                url:
                    "https://do3vuuv41l.execute-api.us-east-1.amazonaws.com/login/online",
                method: "GET",
            })
                .then((res) => {
                    // const temp = res.data["message"];
                    const onlineUser = res.data.online
                    const topic = "Process"
                    console.log("IN SUCCESS");
                    console.log(onlineUser);
                    console.log(typeof (onlineUser));
                    console.log(topic)
                    let online_users = onlineUser;
                    let subscribers = [];
                    online_users.forEach(function (item) {
                        let user = item.split("@")[0];
                        console.log(user);
                        subscribers.push(user);
                    });
                    console.log(subscribers);
                    console.log(typeof(subscribers));
                    axios({
                        url:
                            "https://us-central1-serverless-project-283717.cloudfunctions.net/deleteTopic",
                        method: "POST",
                        data: {
                            topic_name: "Process",
                            subscribers: [...subscribers],
                        }
                    })
                        .then((res) => {
                            console.log("IN SUCCESS");
                            // console.log(res);
                            // localStorage.setItem('online', JSON.stringify(onlineUser));
                            // localStorage.setItem('topic', topic);
                            alert("Chat Session Ended");
                            props.history.push('/')
                        })
                        .catch(({response}) => {
                            console.log("IN SUCCESS1");
                            console.log(response);
                            alert("Chat Session Ended");
                            props.history.push('/')
                        });
                })
                .catch(({response}) => {
                    console.log("IN ERROR");
                    console.log(response);
                });
        }, 180000);
    }, []);
    useEffect(() => {
        setInterval(() => {
            axios({
                url:
                    "https://us-central1-serverless-project-283717.cloudfunctions.net/listenMessages",
                method: "POST",
                data: {
                    sub_id: localStorage.getItem("email").split("@")[0],
                    uniqueFileName: localStorage.getItem("topic") + ".txt",
                },
            })
                .then((res) => {
                    let a = chat;
                    for (let i = 0; i < res.data.length; i++) {
                        a.push(res.data[i]);
                        console.log("LOG", res.data[i]);
                    }
                    setChat([...a]);
                })
                .catch((error) => {
                    console.log("IN ERROR");
                    console.log(error);
                });
        }, 4000);
    }, []);

    return (
        <Container fluid>
            <Row>
                <Col xs="10" style={{backgroundColor: "#FFFFFF", height: "92.5vh"}}>
                    <div
                        className={"chat-div pt-2 pb-2 pl-4 pr-4"}
                        style={{height: "90vh"}}
                    >
                        {chat.length !== 0 &&
                        chat.map((mychat) => {
                            return (
                                mychat.data.length !== 0 && (
                                    <Row className="justify-content-md-start">
                                        <UserChat message={mychat.data} username={mychat.user}/>
                                    </Row>
                                )
                            );
                        })}
                    </div>
                    <div className={"m-0 pt-1 pb-1 border-div"}>
                        <Row>
                            <Col xs={10}>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter message..."
                                    onChange={(e) => setMessage(e.target.value)}
                                />
                            </Col>
                            <Col>
                                <Button variant="primary" onClick={handleSubmit}>
                                    Send
                                </Button>
                            </Col>
                        </Row>
                    </div>
                </Col>
                <Col xs="2" style={{backgroundColor: "#c1c1c1", height: "92.5vh"}}>
                    {online.map((user) => {
                        return <li>{user}</li>;
                    })}
                </Col>
            </Row>
        </Container>
    );
}

export default Chats;

// <Container className={"mt-5 p-0"} style={{ backgroundColor: "#FFFFFF" }}>
//   <div className={"chat-div pt-2 pb-2 pl-4 pr-4"}>
//     <Row className="justify-content-md-end">
//       <UserChat message={"1"} time={"11:11"} />
//     </Row>
//     <Row className="justify-content-md-start ">
//       <OtherChat message={"1"} time={"11:11"} />
//     </Row>
//     <Row className="justify-content-md-end">
//       <UserChat message={"2"} time={"22:22"} />
//     </Row>
//     <Row className="justify-content-md-start ">
//       <OtherChat message={"1"} time={"11:11"} />
//     </Row>
//     <Row className="justify-content-md-end">
//       <UserChat message={"1"} time={"11:11"} />
//     </Row>
//     <Row className="justify-content-md-start ">
//       <OtherChat message={"1"} time={"11:11"} />
//     </Row>
//     <Row className="justify-content-md-end">
//       <UserChat message={"2"} time={"22:22"} />
//     </Row>
//     <Row className="justify-content-md-start ">
//       <OtherChat message={"1"} time={"11:11"} />
//     </Row>
//     <Row className="justify-content-md-end">
//       <UserChat message={"1"} time={"11:11"} />
//     </Row>
//     <Row className="justify-content-md-start ">
//       <OtherChat message={"1"} time={"11:11"} />
//     </Row>
//     <Row className="justify-content-md-end">
//       <UserChat message={"2"} time={"22:22"} />
//     </Row>
//     <Row className="justify-content-md-start ">
//       <OtherChat message={"1"} time={"11:11"} />
//     </Row>
//     <Row className="justify-content-md-end">
//       <UserChat message={"1"} time={"11:11"} />
//     </Row>
//     <Row className="justify-content-md-start ">
//       <OtherChat message={"1"} time={"11:11"} />
//     </Row>
//     <Row className="justify-content-md-end">
//       <UserChat message={"2"} time={"22:22"} />
//     </Row>
//     <Row className="justify-content-md-start ">
//       <OtherChat message={"1"} time={"11:11"} />
//     </Row>
//   </div>
//   <div className={"p-2 border-div"}>
//     <Row>
//       <Col xs={11}>
//         <Form.Control type="text" placeholder="Enter message..." />
//       </Col>
//       <Col>
//         <Button variant="primary" type="submit">
//           send
//         </Button>
//       </Col>
//     </Row>
//   </div>
// </Container>
