// index.js
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.get("/status", (req, res) => {
  res.json({ message: "Server is live", steps: ["status"] });
});

app.post("/generate", async (req, res) => {
  try {
    const userData = req.body;
    console.log("Received user data:", userData);

    const openaiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are a resume builder generating ATS-friendly resumes.",
          },
          {
            role: "user",
            content: `Generate a resume based on this info: ${JSON.stringify(userData)}`,
          },
        ],
      }),
    });

    const json = await openaiResponse.json();
    const generatedResume = json.choices?.[0]?.message?.content || "No response";

    res.json({ resume: generatedResume, status: "success" });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Failed to generate resume." });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
