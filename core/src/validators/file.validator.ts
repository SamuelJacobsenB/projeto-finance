import { FileDto } from "../types";

export const validateFile = (fileDto: FileDto) => {
  const { name } = fileDto;

  let errors: string[] = [];

  if (name.length > 30) {
    errors.push("Nome do arquivo deve ter no máximo 30 caracteres");
  }

  return {
    errors: errors.length > 0 ? errors[0] : undefined,
    isValid: errors.length === 0,
  };
};
