const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const app = express();
const port = 5000;

app.use(cors());

app.post('/chat', async (req, res) => {
  const prompt = "Whats the hindi translation of hello how are you doing";
  const apiKey = process.env.API_KEYS;

  if (!apiKey) {
    console.error('API Key is missing');
    return res.status(500).json({ error: 'API Key not found in environment variables' });
  }

  const genAI = new GoogleGenerativeAI({ apiKey });

  try {
    const models = await genAI.listGenerativeModels(); // Debug available models
    console.log('Available Models:', models);

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);

    res.json({ response: result.response.text() });
  } catch (error) {
    console.error('Error Details:', error.errorDetails);
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
