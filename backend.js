import express from 'express';
import dotenv from 'dotenv';
import Groq from 'groq-sdk';
import cors from 'cors';

dotenv.config();

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json()); // Para poder leer JSON en el body de las solicitudes

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

app.post('/api/chat', async (req, res) => {
  const { message } = req.body; // Leemos el mensaje del body de la solicitud
  try {
    const chatCompletion = await getGroqChatCompletion(message);
    res.json(chatCompletion.choices[0]?.message?.content || "");
  } catch (error) {
    res.status(500).send("Error fetching data from Groq API");
  }
});

async function getGroqChatCompletion(message) {
  return groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: message,
      },
    ],
    model: "llama3-8b-8192",
  });
}

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
