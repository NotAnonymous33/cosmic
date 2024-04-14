import React, { useState, useEffect } from "react";
import Card from "./Card.jsx";
import fetchLessons from "./lessons/lessons"; // Import the fetchLessons function
import "./css/LessonsComponent.css"; // Import custom CSS for styling
import Lesson from "./Lesson";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LessonsComponent = () => {
  const [lessons, setLessons] = useState([]);
  const [lessonSelected, setLessonSelected] = useState(false);

  useEffect(() => {
    const fetchLessonsData = async () => {
      try {
        const lessonsData = await fetchLessons();
        console.log(lessons);
        setLessons(lessonsData); // Update state with fetched lessons
        setLessonSelected(true);
      } catch (error) {
        // Handle error if fetching lessons fails
        console.error("Error fetching lessons:", error);
        setLessonSelected(false);
      }
    };

    fetchLessonsData(); // Call the fetchLessonsData function on component mount
  }, []); // Empty dependency array ensures useEffect runs only once on mount

  return (
    <>
      <ToastContainer
        position="bottom-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        theme="dark"
      />
      <div className="lessons-container">
        <h2 className="lessons-title">Cosmic Lessons</h2>
        <div className="card-container">
          {lessons.length > 0 ? (
            lessons.map((lesson) => (
              <Card
                key={lesson.id}
                name={lesson.name}
                description={lesson.description}
                difficulty={lesson.difficulty}
                src={lesson.imageUrl}
              />
            ))
          ) : (
            <p>Loading lessons...</p>
          )}
        </div>
      </div>
    </>
  );
};

export default LessonsComponent;
