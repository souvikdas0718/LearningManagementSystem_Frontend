import React, { useState } from "react";
import { Form, Container, Button, Alert } from "react-bootstrap";
import axios from "axios";

const initialData = {
    email: "",
    password: "",
};
const initialData1 = {
    token: "",
    email: "",
    question: "",
    answer: "",
};

function Login(props) {
    const [show, setShow] = useState(false);
    const [formData, setFormData] = useState(initialData);
    const [newData, setNewData] = useState(initialData1);
    const [error, setError] = useState("");
    const [error1, setError1] = useState("");

    const handleAnswer = () => {
        // console.clear();
        const URI = process.env.REACT_APP_LOGIN_URL_QUESTION;
        console.log(URI);
        axios({
            url: URI,
            method: "POST",
            data: {
                email: newData.email,
                question: newData.question,
                answer: newData.answer,
            },
        })
            .then((res) => {
                const temp = res.data["message"];
                if (temp === "User authenticate success") {
                    console.log(newData)
                    localStorage.setItem('token',newData.token);
                    localStorage.setItem('email',newData.email);
                    props.history.push('/faq')
                } else {
                    setError1(temp);
                }
            })
            .catch(({ response }) => {
                console.log(response);
                setError1("Some internal error occurred!");
            });
    };

    const handleSubmit = () => {
        // console.clear();
        const URI = process.env.REACT_APP_LOGIN_URL;
        console.log(URI);
        axios({
            url: URI,
            method: "POST",
            data: formData,
        })
            .then((res) => {
                console.log(res.data);
                setNewData({
                    ...newData,
                    question: res.data["question"],
                    email: res.data["email"],
                    token: res.data["token"],
                });
                setShow(true);
            })
            .catch(({ response }) => {
                console.log(response["data"]["Error"]);
                setError(response["data"]["Error"]);
                setShow(false);
            });
    };

    return !show ? (
        <Container className={"mt-5"}>
            {error !== "" && <Alert variant={"danger"}>{error}</Alert>}
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                    type="email"
                    value={formData.email}
                    placeholder="Enter email"
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    value={formData.password}
                    placeholder="Enter password"
                    onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                    }
                />
            </Form.Group>
            <Form.Row>
                <Button
                    variant="secondary"
                    type="submit"
                    onClick={() => setFormData(initialData)}
                >
                    Clear
                </Button>
                <Button
                    variant="warning"
                    type="submit"
                    onClick={handleSubmit}
                    className={"ml-5"}
                >
                    Login
                </Button>
            </Form.Row>
        </Container>
    ) : (
        <Container className={"mt-5"}>
            {error1 !== "" && <Alert variant={"danger"}>{error1}</Alert>}
            <Form.Group>
                <Form.Label>Question</Form.Label>
                <Form.Control type="text" value={newData.question} disabled={true} />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Answer</Form.Label>
                <Form.Control
                    type="text"
                    value={newData.answer}
                    placeholder="Enter your answer"
                    onChange={(e) => setNewData({ ...newData, answer: e.target.value })}
                />
            </Form.Group>
            <Form.Row>
                <Button variant="warning" type="submit" onClick={handleAnswer}>
                    Submit
                </Button>
            </Form.Row>
        </Container>
    );
}

export default Login;
