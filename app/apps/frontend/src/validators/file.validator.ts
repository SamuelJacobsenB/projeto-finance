import { FileDto } from "../types";

export const validateFile = (fileDto: FileDto) => {
  const { name } = fileDto;

  const errors: string[] = [];

  if (name.length > 2) {
    errors.push("Nome do arquivo deve ter no máximo 2 caracteres");
  }

  return {
    error: errors.length > 0 ? errors[0] : undefined,
    isValid: errors.length === 0,
  };
};
