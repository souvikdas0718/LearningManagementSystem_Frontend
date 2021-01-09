import React, { useState } from "react";
import SignUp from "./components/signup";
import Login from "./components/login";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Redirect,
} from "react-router-dom";

import "./css/main.css";
import Chat from "./components/chat";
import ChatMain from "./components/chat/chats";
import Chatbot from "./components/chatbot";
import Navigation from "./components/navbar";
import WordCloud from "./components/wordcloud";
import { Container } from "react-bootstrap";

export const OnlineUserContext = React.createContext();

function App() {
  const [onlineUsersList, setOnlineUsersList] = useState([]);
  return (
    <>
      <Router>
        <Navigation />
        <Switch>
          <OnlineUserContext.Provider value={onlineUsersList, setOnlineUsersList}>
            <Route path="/" exact component={Home} />
            <Route path="/login" exact component={Login} />
            <Route path="/signup" exact component={SignUp} />
            <Route path="/chat" exact component={Chat} />
            <Route path="/chatmain" exact component={ChatMain} />
            <Route path="/faq" exact component={Chatbot} />
            <Route path="/wordcloud" exact component={WordCloud} />
          </OnlineUserContext.Provider>
        </Switch>
      </Router>
    </>
  );
}

const Home = () => {
  return (
    <Container style={{ overflow: "hidden", color: "#FFFFFF" }}>
      <br />
      <h2 className="p-2 m-1 ml-auto mr-auto">Learning Management System</h2>
      <br />
      <h4 className="p-2 ml-auto mr-auto">
        We have Login, Signup, FAQ, Data Processing and Analysis too.
      </h4>
    </Container>
  );
};

export default App;
