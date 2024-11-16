const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');

require('dotenv').config();

const app = express();
const port = 5000;

app.use(cors());

app.post('/chat', async (req, res) => {
  const prompt = req.body.prompt;
  const apiKey = process.env.API_KEY;

  const genAI = new GoogleGenerativeAI({ apiKey });
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  try {
    const result = await model.generateContent(prompt);
    res.json({ response: result.response.text() });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error processing request' });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});