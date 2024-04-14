import React, { useState, useEffect } from "react";
import axios from "axios";

function Chatbot() {
  const [chatbotResponse, setChatbotResponse] = useState("");

  useEffect(() => {
    const fetchCurrentLessonAndAskChatbot = async () => {
      const lessonRes = await axios.get(
        "http://localhost:5173/lessons/current"
      );
      const lessonDescription = lessonRes.data.description;

      const chatbotRes = await axios.post("http://localhost:5173/chatbot/ask", {
        message: lessonDescription,
      });
      setChatbotResponse(chatbotRes.data.message);
    };

    fetchCurrentLessonAndAskChatbot();
  }, []);

  return <p>Chatbot says: {chatbotResponse}</p>;
}

export default Chatbot;
