import { TransactionDto } from "../types";

export const validateTransaction = (transactionDro: TransactionDto) => {
  const { type, value, name } = transactionDro;

  const errors: string[] = [];

  if (!name) {
    errors.push("Nome da transação é obrigatório");
  }

  if (name.length < 5 || name.length > 50) {
    errors.push("Nome da transação deve ter entre 5 e 50 caracteres");
  }

  if (type !== "input" && type !== "output") {
    errors.push("Tipo de valor inválido");
  }

  if (!value || value < 0.01) {
    errors.push("Valor muito pequeno ou inválido");
  }

  return {
    error: errors.length > 0 ? errors[0] : undefined,
    isValid: errors.length === 0,
  };
};
