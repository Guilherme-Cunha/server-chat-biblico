import OpenAI from "openai";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  try {
    const { messages } = req.body;

    if (!messages) {
      return res.status(400).json({ error: "Mensagens não fornecidas" });
    }

    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: messages,
    });

    return res.status(200).json({ reply: completion.choices[0].message });
  } catch (error) {
    console.error("Erro na API:", error);
    return res.status(500).json({ error: "Erro interno no servidor" });
  }
}
