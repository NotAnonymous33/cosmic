import axios from "axios";

let lessons = {};
const token = localStorage.getItem("token");

axios
  .get("http://localhost:9191/lessons", {
    headers: {
      Authorization: "Bearer " + token,
    },
  })
  .then((result) => {
    console.log(result.data);
    lessons = result.data;
  })
  .catch((error) => console.log(error));

export default lessons;
