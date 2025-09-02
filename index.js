import express from "express";
import bodyParser from "body-parser";
import chatRouter from "./api/chat.js";

const app = express();
app.use(bodyParser.json());

// rota para o chat
app.use("/api/chat", chatRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
