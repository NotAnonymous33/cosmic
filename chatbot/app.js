const express = require("express");
const app = express();
const cors = require("cors");
const gpt = require("./bot");

app.use(cors);
app.use("/chatGPT", gpt);
app.listen(8080, () => {
  console.log("Server is running on http://localhost:8080");
});
