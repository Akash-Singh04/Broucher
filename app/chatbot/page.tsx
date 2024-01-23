"use client";
import { useState,useEffect } from "react";
import Layout from "../components/layout/Layout";
// import { doc, setDoc } from "firebase/firestore";
import "./style.css";
import { set } from "firebase/database";

const dummyData = [
  {
    message: "Hello, I am Alexa. How can I help you?",
    type: "bot",
  },
  {
    message: "I want to know about the products",
    type: "user",
  },
  {
    message: "Which kind of products?",
    type: "bot",
  },
  {
    message: "Summer vibes",
    type: "user",
  },
  {
    message: "Sure, Here is the link to them",
    type: "bot",
  }];

const Chatbot = () => {
  const [msg, setMsg] = useState("");
  const [botresponse,setBotresponse] = useState([{message: "Hello, I am Alexa. How can I help you?",
  type: "bot",}]);
  useEffect(() => {
    console.log(botresponse);
    // Add any other logic that depends on botresponse here
  }, [botresponse]);
  const handleClick = async () => {
    
    
    try {
      setBotresponse((prevBotresponse) => [
        ...prevBotresponse,
        { message: msg, type: "user" },
      ]);
      const response = await fetch(
        `https://89ae-34-83-197-30.ngrok-free.app?user_id=hjhjhj&str=${msg}`,
        {
          method: "GET",
          headers: new Headers({
            "ngrok-skip-browser-warning": "69420",
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      // console.log(data);
      // setBotresponse([...botresponse,data.message]);   data.message
      setBotresponse((prevBotresponse) => [
        ...prevBotresponse,
        { message:  data.message, type: "bot" },
      ]);
      console.log(botresponse);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  return (
    <Layout>
      <div className="chat-container">
        <div className="header w-full">Alexa</div>
        <div className="content">
          {botresponse.map((item, index) => {
            return (
              item.type === "bot"?
              <div className="res" key={index}>
                <img src="/robot.png" />
                <div className="msg">
                  <p>{item.message}</p>
                </div>
              </div>:
              <div className="que" key={index}>
                <img src="/bot.png" />
                <div className="uque">
                  <p>{item.message}</p>
                </div>
              </div>

            );
          })}
          <div className="enter-message">
            <input
              type="text"
              className="input"
              placeholder=""
              onChange={(e) => setMsg(e.target.value)}
            />
            <button className="send-btn" onClick={handleClick}>
              Send
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Chatbot;
