import * as dotenv from "dotenv";

export const configEnv = () => {
  dotenv.config();
  console.log("Dotenv configurado com sucesso");
};
