import { ConfigFile } from "@/types";

export const configFile: ConfigFile = {
  input_names: [
    { name: "Salário", color: "#FFFF33" },
    { name: "Investimentos", color: "#00CC00" },
    { name: "Dividendos", color: "#FF8000" },
  ],
  output_names: [
    { name: "Alimentação", color: "#00CC00" },
    { name: "Saúde", color: "#FF0000" },
    { name: "Moradia", color: "#0000FF" },
    { name: "Educação", color: "#0080FF" },
    { name: "Lazer", color: "#FFFF33" },
    { name: "Transporte", color: "#FF8000" },
  ],
  currency: "BRL",
};
