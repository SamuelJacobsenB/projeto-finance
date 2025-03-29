import { FolderDto } from "../types";

export const validateFolder = (folderDto: FolderDto) => {
  const { year, month } = folderDto;

  const errors: string[] = [];

  if (!year || year.toString().length != 4 || year < 0) {
    errors.push("Ano inválido");
  }

  if (!month || month.toString().length > 2 || month < 1) {
    errors.push("Mês inválido");
  }

  return {
    error: errors.length > 0 ? errors[0] : undefined,
    isValid: errors.length === 0,
  };
};
