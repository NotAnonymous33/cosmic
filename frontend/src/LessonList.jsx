import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

function LessonsList() {
  const [lessons, setLessons] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("/api/lessons");
      setLessons(result.data);
    };

    fetchData();
  }, []);

  const handleChatbotClick = (description) => {
    history.push(`/chatbot/${description}`);
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th>Difficulty</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {lessons.map((lesson) => (
          <tr key={lesson._id}>
            <td>{lesson.name}</td>
            <td>{lesson.description}</td>
            <td>{lesson.difficulty}</td>
            <td>
              <button onClick={() => handleChatbotClick(lesson.description)}>
                Start chatbot
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default LessonsList;
