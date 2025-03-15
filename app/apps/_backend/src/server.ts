import express from "express";
const server = express();

import cors from "cors";

import { controllers } from "@/modules/controllers";

import "./config";

server.use(express.json());
server.use(
  cors({
    origin: process.env.FRONT_URL ?? "http://localhost:3000",
    credentials: true,
  })
);

server.use("/file", controllers.file);
server.use("/folder", controllers.folder);
server.use("/analyze", controllers.analyze);
server.use("/transaction", controllers.transaction);

server.listen(process.env.PORT ?? 4000, () => {
  console.log(`Servidor rodando na porta ${process.env.PORT}`);
});
