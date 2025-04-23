// index.js
const express = require('express');
const cors = require('cors');
const app = express();

require('dotenv').config();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("🎉 AI Resumate Backend is Live!");
});

// POST endpoint to handle resume generation (optional)
app.post("/generate-resume", async (req, res) => {
  const { prompt } = req.body;
  // Call OpenAI API here
  res.json({ message: "Resume generation logic goes here." });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
