const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

let resumeStatus = {
  steps: [],
  resume: ""
};

app.use(bodyParser.json());

// /generate - Accepts data from app, generates resume
app.post('/generate', async (req, res) => {
  try {
    resumeStatus.steps = ['uploaded'];

    const userInput = req.body.userInput || "Sample resume input";
    resumeStatus.steps.push('gpt-called');

    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a resume generator." },
        { role: "user", content: userInput }
      ],
      temperature: 0.7
    }, {
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      }
    });

    const resume = response.data.choices[0].message.content;
    resumeStatus.steps.push('resume-generated');
    resumeStatus.resume = resume;

    // Simulate download
    setTimeout(() => {
      resumeStatus.steps.push('downloaded');
    }, 3000);

    res.json({ message: "Resume generated", resume });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong while generating resume." });
  }
});

// /status - Shows progress
app.get('/status', (req, res) => {
  res.json(resumeStatus);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
