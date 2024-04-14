const express = require("express");
const app = express();
const chatGPT = require("../chatbot-backend/app");

const PORT = 8080;

app.use("/chatGPT", chatGPT);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
