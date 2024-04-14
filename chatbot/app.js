const express = require("express");
const app = express();
const gpt = require("./bot");

app.use("/chatGPT", gpt);
app.listen(8080, () => {
  console.log("Server is running on http://localhost:8080");
});
