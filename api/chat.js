import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

// Rota de chat
app.post("/chat", async (req, res) => {
  const { question } = req.body;

  try {
    // Aqui você pode usar OpenAI ou outro modelo
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini", // pode trocar pelo modelo que preferir
        messages: [
          { role: "system", content: "Você é um assistente bíblico que responde com base na NTLH." },
          { role: "user", content: question }
        ],
      }),
    });

    const data = await response.json();
    const answer = data.choices[0].message.content;

    res.json({ answer });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao processar a pergunta." });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
