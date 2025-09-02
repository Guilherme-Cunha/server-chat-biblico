import express from "express";
import fetch from "node-fetch";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { message } = req.body;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini", // ou "gpt-4o"
        messages: [
          { role: "system", content: "Você é um assistente bíblico." },
          { role: "user", content: message },
        ],
      }),
    });

    const data = await response.json();

    if (!data.choices || !data.choices.length) {
      throw new Error("Resposta inválida da API OpenAI");
    }

    res.json({ reply: data.choices[0].message.content });

  } catch (error) {
    console.error("Erro no chat API:", error);
    res.status(500).json({ error: "Erro no servidor" });
  }
});

export default router;
