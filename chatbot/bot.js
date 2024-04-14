const OpenAI = require("openai");
const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();

const router = express.Router();
router.use(bodyParser.json());
const openai = new OpenAI.default();

const apiKey = process.env.OPENAI_API_KEY;

router.post("/chat", async (req, res) => {
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "user",
        content: req.body.prompt + " as if I am a primary kid",
      },
    ],
    model: "gpt-4-turbo",
  });
  res.send(completion.choices[0].message.content);
  res.status(200);
});

module.exports = router;
