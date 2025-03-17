import express from "express";
const server = express();

import cors from "cors";

import { configEnv } from "./config";
configEnv();

import { controllers } from "./modules/controllers";
import { CorsConfig } from "./constants";

server.use(express.json());
server.use(cors(CorsConfig));

server.use("/file", controllers.file);
server.use("/folder", controllers.folder);
server.use("/analyze", controllers.analyze);
server.use("/transaction", controllers.transaction);

server.get("/", () => {
  console.log("Servidor rodando...");
  return; // Log para teste do server rodando.
});

server.listen(process.env.PORT ?? 4000, () => {
  console.log(`Servidor rodando na porta ${process.env.PORT}`);
});
