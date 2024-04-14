import axios from "axios";

// Function to fetch lessons from the API
const fetchLessons = async () => {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.get("http://localhost:9191/lessons", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    return response.data; // Return the lessons data
  } catch (error) {
    console.error("Error fetching lessons:", error);
    throw error; // Rethrow the error for handling at the component level
  }
};

export default fetchLessons;
